import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
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

    const body = await request.json()
    const { type, content, x, y, width, height } = body

    // Nejprve najdeme nebo vytvoříme ElementType
    let elementType = await prisma.elementType.findFirst({
      where: { name: type }
    })

    if (!elementType) {
      elementType = await prisma.elementType.create({
        data: {
          name: type,
          description: `Element type for ${type}`,
          isActive: true
        }
      })
    }

    // Vytvoříme element
    const element = await prisma.element.create({
      data: {
        name: `${type}-${Date.now()}`,
        coordsX: Math.round(x),
        coordsY: Math.round(y),
        width: width || 100,
        height: height || 100,
        opacity: 100,
        rotation: 0,
        layer: 0,
        elementTypeId: elementType.id,
        moodboardId: parseInt(id)
      }
    })

    // Vytvoříme atribut pro content
    let contentAttribute = await prisma.attribute.findFirst({
      where: { name: 'content' }
    })

    if (!contentAttribute) {
      contentAttribute = await prisma.attribute.create({
        data: {
          name: 'content',
          description: 'Content of element',
          isActive: true
        }
      })
    }

    // Propojíme atribut s typem elementu
    await prisma.elementAttribute.upsert({
      where: {
        elementTypeId_attributeId: {
          elementTypeId: elementType.id,
          attributeId: contentAttribute.id
        }
      },
      create: {
        elementTypeId: elementType.id,
        attributeId: contentAttribute.id
      },
      update: {}
    })

    // Vytvoříme hodnotu
    await prisma.elementValue.create({
      data: {
        elementId: element.id,
        attributeId: contentAttribute.id,
        value: content
      }
    })

    const fullElement = await prisma.element.findUnique({
      where: { id: element.id },
      include: {
        elementType: true,
        values: {
          include: {
            attribute: true
          }
        }
      }
    })

    return NextResponse.json(fullElement, { status: 201 })
  } catch (error) {
    console.error('Error creating element:', error)
    return NextResponse.json({ error: 'Failed to create element' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = request.nextUrl.searchParams.get('userId') || 'temp-user-id'

    const body = await request.json()
    const { elementId } = body

    // Ověříme, že element patří uživateli
    const element = await prisma.element.findFirst({
      where: {
        id: elementId,
        moodboard: {
          id: parseInt(id),
          userId
        }
      }
    })

    if (!element) {
      return NextResponse.json({ error: 'Element not found' }, { status: 404 })
    }

    // Delete all values first (foreign key constraint)
    await prisma.elementValue.deleteMany({
      where: { elementId }
    })

    // Then delete the element
    await prisma.element.delete({
      where: { id: elementId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting element:', error)
    return NextResponse.json({ error: 'Failed to delete element' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = request.nextUrl.searchParams.get('userId') || 'temp-user-id'

    const body = await request.json()
    const { elementId, x, y, width, height, opacity, rotation, borderRadius, strokeWidth, strokeColor, shadowX, shadowY, shadowBlur, shadowColor, blendMode, fontSize, fontWeight, textColor, textAlign, fontFamily, content, layer } = body

    // Ověříme, že element patří uživateli
    const element = await prisma.element.findFirst({
      where: {
        id: elementId,
        moodboard: {
          id: parseInt(id),
          userId
        }
      }
    })

    if (!element) {
      return NextResponse.json({ error: 'Element not found' }, { status: 404 })
    }

    const updateData: Record<string, number> = {}
    if (x !== undefined) updateData.coordsX = Math.round(x)
    if (y !== undefined) updateData.coordsY = Math.round(y)
    if (width !== undefined) updateData.width = Math.round(width)
    if (height !== undefined) updateData.height = Math.round(height)
    if (opacity !== undefined) updateData.opacity = Math.round(opacity)
    if (rotation !== undefined) updateData.rotation = Math.round(rotation)
    if (layer !== undefined) updateData.layer = layer

    // Update element
    await prisma.element.update({
      where: { id: elementId },
      data: updateData
    })

    // Update style attributes (stored as ElementValue)
    const styleAttributes = [
      { name: 'borderRadius', value: borderRadius },
      { name: 'strokeWidth', value: strokeWidth },
      { name: 'strokeColor', value: strokeColor },
      { name: 'shadowX', value: shadowX },
      { name: 'shadowY', value: shadowY },
      { name: 'shadowBlur', value: shadowBlur },
      { name: 'shadowColor', value: shadowColor },
      { name: 'blendMode', value: blendMode },
      { name: 'fontSize', value: fontSize },
      { name: 'fontWeight', value: fontWeight },
      { name: 'textColor', value: textColor },
      { name: 'textAlign', value: textAlign },
      { name: 'fontFamily', value: fontFamily },
      { name: 'content', value: content }
    ]

    for (const attr of styleAttributes) {
      if (attr.value === undefined) continue
      
      // Find or create attribute
      let attribute = await prisma.attribute.findFirst({
        where: { name: attr.name }
      })
      
      if (!attribute) {
        attribute = await prisma.attribute.create({
          data: {
            name: attr.name,
            description: `Style attribute: ${attr.name}`,
            isActive: true
          }
        })
      }
      
      // Upsert ElementValue
      await prisma.elementValue.upsert({
        where: {
          elementId_attributeId: {
            elementId,
            attributeId: attribute.id
          }
        },
        create: {
          elementId,
          attributeId: attribute.id,
          value: String(attr.value)
        },
        update: {
          value: String(attr.value)
        }
      })
    }

    const updated = await prisma.element.findUnique({
      where: { id: elementId },
      include: {
        elementType: true,
        values: {
          include: {
            attribute: true
          }
        }
      }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating element:', error)
    return NextResponse.json({ error: 'Failed to update element' }, { status: 500 })
  }
}
