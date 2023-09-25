import React,{useState} from "react"
import Swal from 'sweetalert2'
import { useGetDataQuery, useDeleteDataMutation,useEditDataMutation } from "../api/apiSlice"

const Details = () =>{
    const {
        data: formdata,
        isLoading,
        isSuccess,
        isError,
        error } = useGetDataQuery()

        const [deleteData] = useDeleteDataMutation();
        const [editData] = useEditDataMutation();
        const [editingId, setEditingId] = useState([]);
        const [editedData, setEditedData] = useState({}); 

        const handleEdit = (id) => {
            setEditingId(id);
        const itemToEdit = formdata.find(item => item.id === id);
        setEditedData(itemToEdit);
        }
        const handleSave = async (id) => {
            try {
                await editData(editedData);
                setEditingId(null);
            } catch (error) {
                console.error("Error editing data:", error);
            }
        }

        const handleDelete = async (id) => {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
    
            if (result.isConfirmed) {
                try {
                    await deleteData({ id });
                } catch (error) {
                    console.error("Error deleting data:", error);
                }
            }
        }
        const handleChange = (field, value) => {
            setEditedData(prevData => ({
                ...prevData,
                [field]: value
            }));
        }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Pincode</th>
                    <th scope="col">Country</th>
                    <th scope="col">State</th>
                    <th scope="col">City</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {formdata.map(item => (
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td> {editingId === item.id ? (
                                <input type="text" className="form-control" value={editedData.name || item.name}  onChange={(e) => handleChange('name', e.target.value)} />
                            ) : (
                                item.name
                            )}</td>
                        <td>
                        {editingId === item.id ? (
                                <input type="text" className="form-control" value={editedData.email || item.email}  onChange={(e) => handleChange('email', e.target.value)} />
                            ) : (
                                item.email
                            )}
                        </td>
                        <td>
                        {editingId === item.id ? (
                                <input type="text" className="form-control"value={editedData.pincode || item.pincode}  onChange={(e) => handleChange('pincode', e.target.value)} />
                            ) : (
                                item.pincode
                            )}
                            </td>
                        <td>
                        {editingId === item.id ? (
                                <input type="text" className="form-control" value={editedData.country || item.country}  onChange={(e) => handleChange('country', e.target.value)} />
                            ) : (
                                item.country
                            )}
                        </td>
                        <td>
                        {editingId === item.id ? (
                                <input type="text" className="form-control" value={editedData.state || item.state}  onChange={(e) => handleChange('state', e.target.value)} />
                            ) : (
                                item.state
                            )}
                        </td>
                        <td>
                        {editingId === item.id ? (
                                <input type="text" className="form-control"value={editedData.city || item.city}  onChange={(e) => handleChange('city', e.target.value)} />
                            ) : (
                                item.city
                            )}
                        </td>
                        <td>
                            {editingId === item.id ? (
                                <i className="fas fa-save mx-2" style={{ color: 'green', cursor: 'pointer', fontSize: '20px' }} onClick={() => handleSave(item.id)}></i>
                            ) : (
                                <i className="fas fa-pen mx-2" style={{ color: '#ebc400',cursor: 'pointer' }} onClick={() => handleEdit(item.id)}></i>
                            )}
                            <i className="fas fa-trash mx-2" style={{ color: '#ce1c1c',cursor: 'pointer' }} onClick={() => handleDelete(item.id)}></i>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Details