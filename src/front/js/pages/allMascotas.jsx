import React from "react";
import MascotaCard from "../component/mascotaCard.jsx";


const AllMascotas = () => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center gx-5">
                <div className="col-md-6 col-sm-12 col-lg-4 col-xxl-3">
                    <MascotaCard />
                </div>
                <div className="col-md-6 col-sm-12 col-lg-4 col-xxl-3">
                    <MascotaCard />
                </div>
                <div className="col-md-6 col-sm-12 col-lg-4 col-xxl-3">
                    <MascotaCard />
                </div>
                <div className="col-md-6 col-sm-12 col-lg-4 col-xxl-3">
                    <MascotaCard />
                </div>
                <div className="col-md-6 col-sm-12 col-lg-4 col-xxl-3">
                    <MascotaCard />
                </div>
                <div className="col-md-6 col-sm-12 col-lg-4 col-xxl-3">
                    <MascotaCard />
                </div>
                <div className="col-md-6 col-sm-12 col-lg-4 col-xxl-3">
                    <MascotaCard />
                </div>
                <div className="col-md-6 col-sm-12 col-lg-4 col-xxl-3">
                    <MascotaCard />
                </div>
            </div>
        </div>
    );
}

export default AllMascotas;