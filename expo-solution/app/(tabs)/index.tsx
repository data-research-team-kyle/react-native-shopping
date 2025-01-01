import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, ListRenderItemInfo } from 'react-native';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';

import { banners, categories, popularProducts } from '@/data';
import { COLORS, icons, images, SIZES } from '@/constants';
import { useTheme } from '@/theme/ThemeProvider';
import SubHeaderItem from '@/components/SubHeaderItem';
import Category from '@/components/Category';
import ProductCard from '@/components/ProductCard';

interface BannerItem {
  id: number;
  discount: string;
  discountName: string;
  bottomTitle: string;
  bottomSubtitle: string;
}

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { dark, colors } = useTheme();

  /*
  * render Header
  */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.viewLeft}>
          <Image
            source={images.user1}
            resizeMode='contain'
            style={styles.userIcon} />
          <View style={styles.viewNameContainer}>
            <Text style={styles.greeeting}>Good Morning👋</Text>
            <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>Andrew Ainsley</Text>
          </View>
        </View>
        <View style={styles.viewRight}>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Image
              source={icons.notificationBell2}
              resizeMode='contain'
              style={[styles.bellIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('mywishlist')}>
            <Image
              source={icons.heartOutline}
              resizeMode='contain'
              style={[styles.bookmarkIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  /*
  * render Search Bar
  */
  const renderSearchBar = () => {
    const handleInputFocus = () => {
      navigation.navigate('search');
    }

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('search')}
        style={[styles.searchBarContainer, { backgroundColor: dark ? COLORS.dark2 : "#F5F5F5"}]}>
        <TouchableOpacity>
          <Image
            source={icons.search2}
            resizeMode='contain'
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <TextInput
          placeholder='Search'
          placeholderTextColor={ COLORS.gray }
          style={styles.searchInput}
          onFocus={handleInputFocus}
        />
        <TouchableOpacity>
          <Image
            source={icons.filter}
            resizeMode='contain'
            style={[styles.filterIcon, { tintColor: dark ? COLORS.white : COLORS.primary}]}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    )
 }

  /*
  * render Banner
  */
  const renderBannerItem = ({ item }: ListRenderItemInfo<BannerItem>) => {
    return (
      <View style={[styles.bannerContainer, { backgroundColor: dark ? COLORS.dark3 : COLORS.secondary }]}>
        <View style={styles.bannerTopContainer}>
          <View>
            <Text style={[styles.bannerDicount, { color: dark ? COLORS.white : COLORS.black }]}>{item.discount} OFF</Text>
            <Text style={[styles.bannerDiscountName, { color: dark ? COLORS.white : COLORS.black }]}>{item.discountName}</Text>
          </View>
          <Text style={[styles.bannerDiscountNum, { color: dark ? COLORS.white : COLORS.black }]}>{item.discount}</Text>
        </View>
        <View style={styles.bannerBottomContainer}>
          <Text style={[styles.bannerBottomTitle, { color: dark ? COLORS.white : COLORS.black }]}>{item.bottomTitle}</Text>
          <Text style={[styles.bannerBottomSubtitle, { color: dark ? COLORS.white : COLORS.black }]}>{item.bottomSubtitle}</Text>
        </View>
      </View>
    )
  }

  const keyExtractor = (item: { id: number | string }) => item.id.toString();

  const handleEndReached = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  }

  const renderDot = (index: number) => {
    return (
      <View style={[styles.dot, index === currentIndex ? styles.activeDot : null]} key={index} />
    )
  }

  const renderBanner = () => {
    return (
      <View style={[styles.bannerItemContainer, { backgroundColor: dark ? COLORS.dark3 : COLORS.secondary }]}>
        <FlatList
          data={banners}
          renderItem={renderBannerItem}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / SIZES.width);
            setCurrentIndex(newIndex);
          }}
        />
        <View style={styles.dotContainer}>
          { banners.map((_, index) => renderDot(index))}
        </View>
      </View>
    )
  }

  /*
  * render categories
  */
  const renderCategories = () => {
    return (
      <View>
        <SubHeaderItem
          title="Categories"
          navTitle="See All"
          onPress={() => navigation.navigate('categories')}
        />
        <FlatList
          data={categories.slice(1, 9)}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={4}
          renderItem={({item}) => (
            <Category
              name={item.name}
              icon={item.icon}
              onPress={item.onPress ? () => navigation.navigate(item.onPress) : undefined}
            />
          )}
        />
      </View>
    )
  } 

  /*
  * render popular products
  */
  const renderPopularProducts = () => {
    const [selectedCategories, setSelectedCategories] = useState<any[]>(["0"]);
    const filteredProducts = popularProducts.filter(product => selectedCategories.includes("0") || selectedCategories.includes(product.categoryId));

    const renderCategoryItem = ({ item }: { item: { id: string; name: string }}) => (
      <TouchableOpacity
        style={{
          backgroundColor: selectedCategories.includes(item.id) ? dark ? COLORS.dark3 : COLORS.primary : "transparent",
          padding: 10,
          marginVertical: 5,
          borderColor: dark ? COLORS.dark3 : COLORS.primary,
          borderWidth: 1.3,
          borderRadius: 24,
          marginRight: 12,
        }}
        onPress={() => toggleCategory(item.id)}>
        <Text style={{ color: selectedCategories.includes(item.id) ? COLORS.white : dark ? COLORS.white : COLORS.primary }}>{item.name}</Text>
      </TouchableOpacity>
    );

    const toggleCategory = (categoryId: string) => {
      const updatedCategories = [...selectedCategories];
      const index = updatedCategories.indexOf(categoryId);

      if (index === -1) {
        updatedCategories.push(categoryId);
      } else {
        updatedCategories.splice(index, 1);
      }

      setSelectedCategories(updatedCategories);
    }

    return (
      <View>
        <SubHeaderItem
          title="Most Popular"
          navTitle="See All"
          onPress={() => navigation.navigate('mostpopularproducts')}
        />
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderCategoryItem}
        />
        <View style={{ backgroundColor: dark ? COLORS.dark1 : COLORS.white, marginVertical: 16}}>
          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={{ gap: 16 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <ProductCard
                  name={item.name}
                  image={item.image}
                  numSolds={item.numSolds}
                  price={item.price}
                  rating={item.rating}
                  onPress={() => navigation.navigate(item.navigate)}
                />
              )
            }}
          />
        </View>
      </View>
    )
  }


  /*
  * render Home
  */
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        {renderSearchBar()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderBanner()}
          {renderCategories()}
          {renderPopularProducts()}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16
  },
  headerContainer: {
    flexDirection: "row",
    width: SIZES.width - 32,
    justifyContent: "space-between",
    alignItems: "center"
  },
  userIcon: {
    width: 48,
    height: 48,
    borderRadius: 32
  },
  viewLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  greeeting: {
    fontSize: 12,
    fontFamily: "regular",
    color: "gray",
    marginBottom: 4
  },
  title: {
    fontSize: 20,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  viewNameContainer: {
    marginLeft: 12
  },
  viewRight: {
    flexDirection: "row",
    alignItems: "center"
  },
  bellIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
    marginRight: 8
  },
  bookmarkIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.gray
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "regular",
    marginHorizontal: 8
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary
  },
  bannerContainer: {
    width: SIZES.width - 32,
    height: 154,
    paddingHorizontal: 28,
    paddingTop: 28,
    borderRadius: 32,
    backgroundColor: COLORS.secondary
  },
  bannerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bannerDicount: {
    fontSize: 12,
    fontFamily: "medium",
    color: COLORS.black,
    marginBottom: 4
  },
  bannerDiscountName: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.black
  },
  bannerDiscountNum: {
    fontSize: 46,
    fontFamily: "bold",
    color: COLORS.black
  },
  bannerBottomContainer: {
    marginTop: 8
  },
  bannerBottomTitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.black
  },
  bannerBottomSubtitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.black,
    marginTop: 4
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 999
  },
  firstName: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.dark2,
    marginTop: 6
  },
  bannerItemContainer: {
    width: "100%",
    paddingBottom: 10,
    backgroundColor: COLORS.secondary,
    height: 170,
    borderRadius: 32,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.black,
  }
})

export default Home