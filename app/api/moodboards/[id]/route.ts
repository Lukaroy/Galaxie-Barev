import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Allow large request bodies (images as base64 in fabric.js JSON)
export const maxDuration = 30

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = request.nextUrl.searchParams.get('userId') || 'temp-user-id'

    const moodboard = await prisma.moodboard.findFirst({
      where: {
        id: parseInt(id),
        userId
      },
      include: {
        elements: {
          include: {
            elementType: true,
            values: {
              include: {
                attribute: true
              }
            }
          },
          orderBy: { zIndex: 'asc' }
        }
      }
    })

    if (!moodboard) {
      return NextResponse.json({ error: 'Moodboard not found' }, { status: 404 })
    }

    return NextResponse.json(moodboard)
  } catch (error) {
    console.error('Error fetching moodboard:', error)
    return NextResponse.json({ error: 'Failed to fetch moodboard' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = request.nextUrl.searchParams.get('userId') || 'temp-user-id'

    const moodboard = await prisma.moodboard.findFirst({
      where: {
        id: parseInt(id),
        userId
      }
    })

    if (!moodboard) {
      return NextResponse.json({ error: 'Moodboard not found' }, { status: 404 })
    }

    // Cascade delete handles elements and elementValues automatically
    await prisma.moodboard.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting moodboard:', error)
    return NextResponse.json({ error: 'Failed to delete moodboard' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name } = body

    const moodboard = await prisma.moodboard.findFirst({
      where: {
        id: parseInt(id),
        userId
      }
    })

    if (!moodboard) {
      return NextResponse.json({ error: 'Moodboard not found' }, { status: 404 })
    }

    const updated = await prisma.moodboard.update({
      where: { id: parseInt(id) },
      data: { name }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating moodboard:', error)
    return NextResponse.json({ error: 'Failed to update moodboard' }, { status: 500 })
  }
}

// Helper: resolve fabric type name to a DB ElementType name
function fabricTypeToDbType(fabricType: string): string {
  switch (fabricType) {
    case 'i-text': return 'text'
    case 'textbox': return 'text'
    case 'rect': return 'rect'
    case 'circle': return 'circle'
    case 'image': return 'image'
    case 'path': return 'path'
    case 'group': return 'group'
    case 'line': return 'line'
    case 'polygon': return 'polygon'
    case 'triangle': return 'triangle'
    default: return fabricType || 'unknown'
  }
}

// Helper: extract searchable attribute values from a fabric object
function extractAttributes(fabricObj: Record<string, any>): Record<string, string> {
  const attrs: Record<string, string> = {}
  const type = fabricObj.type

  try {
    // Common — only store string fills, skip gradients/patterns
    if (fabricObj.fill && typeof fabricObj.fill === 'string') attrs['fill'] = fabricObj.fill
    if (fabricObj.stroke && typeof fabricObj.stroke === 'string' && fabricObj.stroke !== 'transparent') attrs['stroke'] = fabricObj.stroke
    if (fabricObj.opacity !== undefined && fabricObj.opacity !== 1) attrs['opacity'] = String(fabricObj.opacity)

    // Text
    if (type === 'i-text' || type === 'text' || type === 'textbox') {
      if (fabricObj.text) attrs['content'] = String(fabricObj.text).substring(0, 1000)
      if (fabricObj.fontFamily) attrs['fontFamily'] = String(fabricObj.fontFamily)
      if (fabricObj.fontSize) attrs['fontSize'] = String(fabricObj.fontSize)
      if (fabricObj.fontWeight && fabricObj.fontWeight !== 'normal') attrs['fontWeight'] = String(fabricObj.fontWeight)
      if (fabricObj.fontStyle && fabricObj.fontStyle !== 'normal') attrs['fontStyle'] = String(fabricObj.fontStyle)
    }

    // Image — skip huge base64 src
    if (type === 'image' && fabricObj.src && typeof fabricObj.src === 'string') {
      if (!fabricObj.src.startsWith('data:')) {
        attrs['src'] = fabricObj.src.substring(0, 500)
      }
    }

    // Shape specific
    if (type === 'circle' && fabricObj.radius) {
      attrs['radius'] = String(fabricObj.radius)
    }
  } catch {
    // Don't fail the whole save because of attribute extraction
  }

  return attrs
}

// Helper: find or create an ElementType by name
async function getOrCreateElementType(name: string) {
  let et = await prisma.elementType.findUnique({ where: { name } })
  if (!et) {
    try {
      et = await prisma.elementType.create({
        data: { name, description: `Fabric.js ${name} element`, isActive: true }
      })
    } catch {
      // Race condition — another request created it
      et = await prisma.elementType.findUnique({ where: { name } })
    }
  }
  return et!
}

// Helper: find or create an Attribute by name
async function getOrCreateAttribute(name: string) {
  let attr = await prisma.attribute.findUnique({ where: { name } })
  if (!attr) {
    try {
      attr = await prisma.attribute.create({
        data: { name, description: `Auto-created: ${name}`, isActive: true }
      })
    } catch {
      attr = await prisma.attribute.findUnique({ where: { name } })
    }
  }
  return attr!
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { canvasJson, canvasWidth, canvasHeight, bgColor, elements, viewportX, viewportY, viewportScale } = body

    const moodboardId = parseInt(id)

    const moodboard = await prisma.moodboard.findFirst({
      where: { id: moodboardId, userId }
    })

    if (!moodboard) {
      return NextResponse.json({ error: 'Moodboard not found' }, { status: 404 })
    }

    // Update moodboard metadata
    const updateData: Record<string, any> = {}
    if (canvasJson !== undefined) updateData.canvasJson = canvasJson
    if (canvasWidth !== undefined) updateData.canvasWidth = canvasWidth
    if (canvasHeight !== undefined) updateData.canvasHeight = canvasHeight
    if (bgColor !== undefined) updateData.bgColor = bgColor
    if (viewportX !== undefined) updateData.viewportX = viewportX
    if (viewportY !== undefined) updateData.viewportY = viewportY
    if (viewportScale !== undefined) updateData.viewportScale = viewportScale

    await prisma.moodboard.update({
      where: { id: moodboardId },
      data: updateData
    })

    // Save elements if provided
    if (elements && Array.isArray(elements) && elements.length >= 0) {
      // Explicitly delete in correct FK order: Values → Elements
      const existingElements = await prisma.element.findMany({
        where: { moodboardId },
        select: { id: true }
      })
      const existingIds = existingElements.map(e => e.id)

      if (existingIds.length > 0) {
        await prisma.elementValue.deleteMany({
          where: { elementId: { in: existingIds } }
        })
        await prisma.element.deleteMany({
          where: { moodboardId }
        })
      }

      // Create new elements from fabric objects
      for (let i = 0; i < elements.length; i++) {
        try {
          const fabricObj = typeof elements[i] === 'string' ? JSON.parse(elements[i]) : elements[i]
          if (!fabricObj || !fabricObj.type) continue

          const typeName = fabricTypeToDbType(fabricObj.type)
          const elementType = await getOrCreateElementType(typeName)

          const element = await prisma.element.create({
            data: {
              fabricJson: JSON.stringify(fabricObj),
              zIndex: i,
              elementTypeId: elementType.id,
              moodboardId
            }
          })

          // Extract and store searchable attributes
          const attrs = extractAttributes(fabricObj)
          for (const [attrName, attrValue] of Object.entries(attrs)) {
            try {
              const attribute = await getOrCreateAttribute(attrName)

              // Ensure ElementAttribute link exists
              await prisma.elementAttribute.upsert({
                where: {
                  elementTypeId_attributeId: {
                    elementTypeId: elementType.id,
                    attributeId: attribute.id
                  }
                },
                create: { elementTypeId: elementType.id, attributeId: attribute.id },
                update: {}
              })

              await prisma.elementValue.create({
                data: {
                  elementId: element.id,
                  attributeId: attribute.id,
                  value: attrValue
                }
              })
            } catch (attrErr) {
              console.error(`Error saving attribute ${attrName} for element ${i}:`, attrErr)
              // Continue with other attributes
            }
          }
        } catch (elErr) {
          console.error(`Error saving element ${i}:`, elErr)
          // Continue with other elements
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating moodboard data:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to update moodboard data', details: message }, { status: 500 })
  }
}
