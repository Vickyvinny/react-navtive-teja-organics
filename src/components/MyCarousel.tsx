import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../utils/Colors';

interface CarouselItemData {
  id: number;
  image: ImageSourcePropType | undefined;
  title: string;
  subTitle: string;
}

const data: CarouselItemData[] = [
  {
    id: 1,
    image: require('../assets/imageOne.png'),
    title: '90 min Delivery',
    subTitle: 'It is a long established fact that a reader will be distracted',
  },
  {
    id: 2,
    image: require('../assets/imageTwo.png'),
    title: 'Antibiotic free',
    subTitle: 'It is a long established fact that a reader will be distracted',
  },
  {
    id: 3,
    image: require('../assets/imageThree.png'),
    title: 'Halal certified',
    subTitle: 'It is a long established fact that a reader will be distracted',
  },
];

const MyCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const renderItem = ({item}: {item: CarouselItemData}) => (
    <View style={styles.carouselItem} key={item.id}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subTitle}>{item.subTitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        // @ts-ignore
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.8}
        layout={'default'}
        onSnapToItem={index => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.8}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#fff',
 
  },
  carouselItem: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  imageContainer: {
    borderWidth: 10,
    width: 145,
    height: 145,
    borderRadius: 100,
    borderColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F5BF45',
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
});

export default MyCarousel;
