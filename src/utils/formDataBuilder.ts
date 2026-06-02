import type {

  CategoryCreateData,
  CategoryUpdateData,
 
} from '../types/category.types'

export const buildFormData = (
  data: CategoryCreateData | CategoryUpdateData
): FormData => {
  const formData = new FormData()

  if (data.name !== undefined) {
    formData.append('name', data.name)
  }

  if (data.slug !== undefined) {
    formData.append('slug', data.slug)
  }

  if (data.description !== undefined) {
    formData.append('description', data.description || '')
  }

  if (data.parent_id !== undefined) {
    formData.append('parent_id', data.parent_id?.toString() || '')
  }

  if (data.is_active !== undefined) {
    formData.append('is_active', data.is_active ? '1' : '0')
  }

  if (data.sort_order !== undefined) {
    formData.append('sort_order', data.sort_order.toString())
  }

  if (data.image instanceof File) {
    formData.append('image', data.image)
    console.log(data.image instanceof File) // should be true
  }

  return formData
}

