import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Detail() {
    const { slug } = useParams();
    const [isAdult, setIsAdult] = useState(false);
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [slug]);

    async function getData() {
        setLoading(true);
        try {
            const response = await axios.get(`https://mangadesu-backend.vercel.app/manga/${slug}`);
            const data = response.data;
            setManga(data);

            // Check for genres
            const genre = data.genre.toLowerCase();
            if (genre.includes("adult") || genre.includes("doujinshi") || genre.includes("ecchi") || genre.includes("mature") || genre.includes("yaoi") || genre.includes("yuri")) {
                Swal.fire({
                    title: 'Warning!',
                    text: 'Konten ini mungkin tidak cocok untuk semua usia. Apakah Anda berusia 18 tahun lebih?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, I am 18 or older',
                    cancelButtonText: 'No',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsAdult(true);
                    } else {
                        setIsAdult(false);
                    }
                    setLoading(false); // set loading to false after user responds
                });
            } else {
                setIsAdult(true);
                setLoading(false);
            }
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status"></div>
                </div>
            </div>
        );
    }

    if (!isAdult) {
        return (
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <div className="alert alert-danger" role="alert">
                        You must be 18 or older to view this content.
                    </div>
                </div>
            </div>
        );
    }

    if (!manga) {
        return (
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <div className="alert alert-danger" role="alert">
                        Manga not found.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-3 d-flex justify-content-center">
                    <div className="">
                        <img src={manga.gambar} alt={manga.nama} className="shadow rounded mb-3 border" />
                    </div>
                </div>
                <div className="col-md-9 mb-3">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{manga.nama}</li>
                            <li className="list-group-item">{manga.author}</li>
                            <li className="list-group-item">{manga.status}</li>
                            <li className="list-group-item">{manga.rilis}</li>
                            <li className="list-group-item">{manga.genre}</li>
                            <li className="list-group-item">
                                <p>{manga.deskripsi}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-12 mb-3">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            {manga.chapters.map((chapter, index) => (
                                <li className="list-group-item" key={index}>
                                    <Link to={`/manga/${slug}/${chapter.slug}`} className="fw-bold text-decoration-none">
                                        {chapter.nama}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
