import React from 'react';

const CustomModal = () => {
    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row mt-2">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Name" aria-label="Name" />
                            </div>
                            <div className="col">
                                <input type="email" className="form-control" placeholder="Email" aria-label="Email" />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Pin code" aria-label="pin" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Country" aria-label="country" />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="State" aria-label="state" />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="City" aria-label="city" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
