import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi ({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery ({ baseUrl: 'https://65002c0e18c34dee0cd46da3.mockapi.io'}),
    tagTypes: ['formdata'],
    endpoints: (builder) => ({
        getData : builder.query({
            query: () => '/Formdata',
            providesTags: ['formdata']
        }),
        deleteData : builder.mutation({
            query: ({id}) => ({
                url: `/Formdata/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['formdata']
        }),
        editData : builder.mutation({
            query: (formdata) => ({
                url:`/Formdata/${formdata.id}`,
                method: 'PUT',
                body: formdata
            }),
            invalidatesTags: ['formdata']
        }),
        addData : builder.mutation ({
            query:(formdata) => ({
                url: '/Formdata',
                method: 'POST',
                body: formdata
            }),
            invalidatesTags: ['formdata']
        })
        
    }) 
})

export const { useGetDataQuery, useDeleteDataMutation, useEditDataMutation, useAddDataMutation } = apiSlice