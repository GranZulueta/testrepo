import React from "react"; // Import React
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native"; // Import components from React Native

import { useRoute } from '@react-navigation/native'; // Import the useRoute hook from React Navigation
import { deleteDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { db } from "../services/config"; // Import Firebase configuration
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook from React Navigation

const CreatedRecipe = () => {
    // Initialize navigation
    const navigation = useNavigation()

    // Get the current route and extract the "recipe" parameter from route.params
    const route = useRoute();
    const { recipe } = route.params;

    // Function to handle the deletion of a recipe
    const handleDeleteRecipe = async () => {
        try {
            // Delete the recipe document from Firestore using its ID
            await deleteDoc(doc(db, 'food_recipe', recipe.id));
            console.log(`Recipe with ID ${recipe.id} deleted successfully.`);
            // Navigate back to the previous screen or a different screen
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.imageContainer} source={{ uri: recipe.data.imageUrl }} resizeMode="cover" />
            <ScrollView style={styles.body}>
                <View style={styles.bodyContainer}>
                    <Text style={styles.headerText}>{recipe.data.food_name}</Text>
                    <View style={styles.subContainer}>
                        <Text style={styles.sectionText}>
                            {recipe.data.category}
                        </Text>
                        <View style={styles.divider} />
                        <Text style={styles.sectionText}>
                            {recipe.data.meal}
                        </Text>
                        <View style={styles.divider} />
                        <Text style={styles.sectionText}>
                            {recipe.data.time_cook}
                        </Text>
                    </View>
                    <Text style={styles.subHeaderText}>Description</Text>
                    <Text style={styles.subText}>{recipe.data.description}</Text>
                    <Text style={styles.subHeaderText}>Direction to cook</Text>
                    <Text style={styles.subText}>{recipe.data.direction}</Text>
                    <Text style={styles.subHeaderText}>Ingredients</Text>
                    <Text style={styles.subText}>{recipe.data.ingredient}</Text>
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleDeleteRecipe}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                    <View style={styles.whiteSpace} />
                </View>
            </ScrollView>
        </View>
    );
};

export default CreatedRecipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        height: '35%',
        borderWidth: 2,
        width: '100%',
    },
    divider: {
        backgroundColor: 'black',
        width: 1.5,
        height: 25,
    },
    body: {
        width: '100%',
        padding: 20,
    },
    bodyContainer: {
        paddingHorizontal: 10, // Added to control container width
        gap: 10,
        alignItems: 'center',
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    sectionText: {
        fontSize: 18,
    },
    headerText: {
        fontSize: 35, // Adjusted font size
        fontWeight: 'bold',
    },
    subHeaderText: {
        fontSize: 20,
    },
    subText: {
        width: '100%',
        fontSize: 15,
        textAlign: 'justify',
    },
    buttonContainer: {
        flexDirection: 'row', // Fixed typo in flexDirection
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 70,
        borderWidth: 2,
        borderColor: '#F18404',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 100,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F18404',
    },
});