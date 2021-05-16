import Link from 'next/link';
import Image from 'next/image';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { slickConfig } from '../../config';
import { CategoryProps } from '../../dtos';

interface Props {
  data: CategoryProps[]
}

const Category = ({ data }: Props) => {

  return (
    <Slider {...slickConfig} className="px-4 pt-4 text-center">
      {
        data.map((item, index) => (
          <div key={index}>
            <Link href={`/restaurants?category=${item.title}`}>
              <a>
                <Image
                  src={item.image_url}
                  alt={item.title}
                  width={300}
                  height={200}
                  className='px-1 clickable_effect'
                />
              </a>
            </Link>
            <p className='fw-bold'>{item.title}</p>
          </div>
        ))
      }
    </Slider>
  )
}

export default Category;