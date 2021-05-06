import {Card, Image} from "semantic-ui-react";
import Link from "next/link";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const RecommendedProducts = ({recommended}) => {

    return (
        <>
            <h2>Recommended Products</h2>
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                navigation
                autoplay
            >
                <Card.Group>
                    {
                        recommended.map((rec) => {
                            return (
                                <SwiperSlide key={rec.id}>
                                    <Link href={`/product/${rec.id}`}>
                                        <Card>
                                            <Image src={rec.images[0].src}/>
                                            <Card.Content>
                                                {rec.title}
                                            </Card.Content>
                                        </Card>
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                </Card.Group>
            </Swiper>
        </>
    )
}

export default RecommendedProducts

