1. Create react native app using npx create-expo-app@latest
2. npm run reset-project
3. delete app-example directory
4. include jsx in the tsConfig.json


Loading fonts
1. Install google fonts
2. Import google fonts
3. load the font
4. validate if the font is loaded
5. Apply the font as font family

Apply theme

1. Create colors.js were you define your colors for dark and    light
2. Create themeContext were you create the theme provider
3. Apply the theme provider on the layout
4. import the useContext hook and theme provider
5. destructure the userContext into colorScheme, setColorScheme and theme
6. Apply the chnages on the styles
7. Create an onPress to change the theme

Animation
1. import Animated and LinearTransition
2. apply Amination to the flatList
3. add keyboardDismissMode="on-drag"
4. set itemLayoutAnimation to linearTransistion


AsyncStorage

1. install asyncStorage
2. import asyncStorage
3. call the useEffect to get the data
4. call the useEffect to save the data to localstorage
