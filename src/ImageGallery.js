import React, { useState, useRef } from 'react';
import Img1 from './images/image-1.webp';
import Img2 from './images/image-2.webp';
import Img3 from './images/image-3.webp';
import Img4 from './images/image-4.webp';
import Img5 from './images/image-5.webp';
import Img6 from './images/image-6.webp';
import Img7 from './images/image-7.webp';
import Img8 from './images/image-8.webp';
import Img9 from './images/image-9.webp';
import Img10 from './images/image-10.jpeg';
import Img11 from './images/image-11.jpeg';
import './gallery.css';

const ImageGallery = () => {
    
    const [data, setData] = useState([
        {
            id: 1,
            img_src: Img1,
            isFeatured: true, 
        },
        {
            id: 2,
            img_src: Img2,
            isFeatured: false,
        },
        {
            id: 3,
            img_src: Img3,
            isFeatured: false,
        },
        {
            id: 4,
            img_src: Img4,
            isFeatured: false,
        },
        {
            id: 5,
            img_src: Img5,
            isFeatured: false,
        },
        {
            id: 6,
            img_src: Img6,
            isFeatured: false,
        },
        {
            id: 7,
            img_src: Img7,
            isFeatured: false,
        },
        {
            id: 8,
            img_src: Img8,
            isFeatured: false,
        },
        {
            id: 9,
            img_src: Img9,
            isFeatured: false,
        },
        {
            id: 10,
            img_src: Img10,
            isFeatured: false,
        },
        {
            id: 11,
            img_src: Img11,
            isFeatured: false,
        }
    ]);

    const [draggedImage, setDraggedImage] = useState(null);
    const [selected, setSelected] = useState([]);

    const handleDragStart = (e, index) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', null);
        setDraggedImage(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        const images = [...data];
        const image = images[draggedImage];
        images.forEach((item) => (item.isFeatured = false));
        images.splice(draggedImage, 1);
        images.splice(index, 0, image);
        images[0].isFeatured = true;
        setData(images);
    };

    const toggleSelection = (id) => {
      if (selected.includes(id)) {
          setSelected(selected.filter((item) => item !== id));
      } else {
          setSelected([...selected, id]);
      }
    };

    const deleteSelected = () => {
        const newData = data.filter((item) => !selected.includes(item.id));
        setData(newData);
        setSelected([]);
    };

    const handleSelectedFiles = (event) => {
        const newImages = event.target.files;

        const newImageData = Array.from(newImages).map((file, index) => ({
            id: data.length + 1 + index, 
            img_src: URL.createObjectURL(file),
            isFeatured: false,
        }));

        setData([...data, ...newImageData]);
    };

    const fileInputRef = useRef(null);
    const handleImageUpload = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <div className="gallery">
             {selected.length > 0 && (
                <div>
                    <button onClick={deleteSelected} className="button">Delete Selected</button>
                    <p>Total Selected: {selected.length}</p>
                </div>
            )}
            {data.map((item, index) => (
                <div
                    key={item.id}
                    className={`pics ${item.isFeatured ? 'featured' : ''}`}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                >
                    <input
                        type="checkbox"
                        onChange={() => toggleSelection(item.id)}
                        checked={selected.includes(item.id)}
                    />
                    <img src={item.img_src} style={{ width: '100%' }} />
                </div>
            ))}
        </div>
        <div>
        <button className="button" onClick={handleImageUpload}>Add Image</button>
            <input
                type="file"
                accept="image/*"
                onChange={handleSelectedFiles}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />
        </div>
        </div>
    );
};

export default ImageGallery;