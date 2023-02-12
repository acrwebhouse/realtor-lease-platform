import React, {useEffect, useState} from 'react';
import { Divider, Row, Col, Image} from "antd";



const ImageFullCenter = (props) => {
    const [init, setInit] = useState(true);
    const [displayType, setDisplayType] = useState(0);

    useEffect(() => {
        if (init) {
            // setInit(false)
            console.log('ImageFullCenter init ')
            console.log(props)
            const main2 = document.getElementById('main2')
            // const width = main.clientWidth
            // const height = main.clientHeight
            // const width = main2.offsetWidth
            // const height = main2.offsetHeight
            // const width = main2.scrollWidth
            // const height = main2.scrollHeight
            // const width = main.style.width
            // const height = main.style.height
            // console.log('ImageFullCenter props ',props)
            // console.log('ImageFullCenter props.src ',props.src)
            // console.log('ImageFullCenter props.address ',props.address)
            // console.log('ImageFullCenter main.src ',main.src)
            // console.log('ImageFullCenter main ',main2)
            // console.log('ImageFullCenter width ',width)
            // console.log('ImageFullCenter height 2 ',height)

            const img = document.createElement("img")
            //img.src = props.src
            // img.src = 'https://matchrentdev.com/house-service/resource/63e8888a2d7169001fa41c7d/photo/F5F7B7E9-9FA0-4F00-A68A-26133F92FCDC.jpeg'
            img.src = props.src
            const width = img.width
            const height = img.height
            console.log('ImageFullCenter width ',width)
            console.log('ImageFullCenter height 3 ',height)
            if(width > 0 || height > 0 ){
                if(width < height){
                    setDisplayType(0)
                }else{
                    setDisplayType(1)
                }
                setInit(false)
                img.remove()
            }

        }
    }, )

    return (
        <div style={{
            // width:'300px',
            // 'overflow-x': 'hidden'
            // height:'300px',
            // overflow:'hidden',
            // display: 'inline-block',
        }}>
            {
                // displayType === 0? (<div>
                //     <Image width={props.size}  src={props.src} fallback={props.fallback} />
                //  </div>):(<div>
                //     <Image height={props.size}  src={props.src} fallback={props.fallback} />
                //     </div>
                //  )
                <Image height={props.size}  src={props.src} fallback={props.fallback} />
            }
        </div>
    );
};

export default ImageFullCenter;
