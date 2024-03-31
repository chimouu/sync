import { View, ScrollView, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES } from '../constants';
import {
    NearbyJobs, Popularjobs, ScreenHeaderBtn, Welcome 
} from '../components';

const Home = () => {
    const router = useRouter();
    return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
            options={{
                headerStyle: { backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl = {images.generate} dimesnion = "100%" />
                ),
                headerTitle: ""
            }}      
        />

        <ScrollView showsVerticalScrollIndicator={false}>
            <View
                style={{
                    flex: 1,
                    padding: SIZES.medium
                }}
            >
                <Welcome

                />

                <Popularjobs/>
                <NearbyJobs/>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default Home;