import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi ({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery ({ baseUrl: 'https://6528e915931d71583df2912d.mockapi.io'}),// we can pass the header here it self
    tagTypes: ['formdata'],// to make the code to refetch again

    //to send the auth token
    
    // reducerPath: 'ent',
    // tagTypes: ['Entity'],
    // baseQuery: fetchBaseQuery({
    //     baseUrl: baseURL , prepareHeaders(headers) {
    //         headers.append('authorization', `Bearer ${token}`)
    //         return headers;
    //     }
    // }),

    endpoints: (builder) => ({
        getData : builder.query({
            query: () => '/Formdata',
            providesTags: ['formdata1']
        }),
        deleteData : builder.mutation({
            query: ({id}) => ({
                url: `/Formdata/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['formdata1']
        }),
        editData : builder.mutation({
            query: (formdata) => ({
                url:`/Formdata/${formdata.id}`,
                method: 'PUT',
                body: formdata
            }),
            invalidatesTags: ['formdata1']// to invalidate to update data by refetching
        }),
        addData : builder.mutation ({
            query:(formdata) => ({
                url: '/Formdata',
                method: 'POST',
                body: formdata
            }),
            invalidatesTags: ['formdata1']
        })
        
    }) 
})

export const { useGetDataQuery, useDeleteDataMutation, useEditDataMutation, useAddDataMutation } = apiSlice