import { baseApi } from "./baseApi";
import { ITodoItem, IBaseTodoItem } from '../../ts/interface'

const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All todo items
    getTodoItems: builder.query<ITodoItem[], void> ({
      query: () => '/todoItems',
      transformResponse:(response: ITodoItem[]) => {
        console.log(response);
        
        return response
      }
    }),
    // Create new todo item
    createTodoItem: builder.mutation<ITodoItem, IBaseTodoItem>({
      query: (newTodoItem) => ({
        url: '/todoItems',
        method: "POST",
        body: newTodoItem
      })
    }),
    // Update exit todo item
    updateTodoItem: builder.mutation<ITodoItem, ITodoItem>({
      query: (updatedTodoItem) => ({
        url: `/todoItems/${updatedTodoItem.id}`,
        method: "PUT",
        body: updatedTodoItem,
      })  
    }),
    // Delete exit todo item
    deleteTodoItem: builder.mutation<string, string>({
      query: (id) => ({
        url: `/todoItems/${id}`,
        method: "DELETE",
      })
    })
  })
})

export const {
  useGetTodoItemsQuery,
  useLazyGetTodoItemsQuery,
  useCreateTodoItemMutation,
  useUpdateTodoItemMutation,
  useDeleteTodoItemMutation,
} = todoApi

export default todoApi;