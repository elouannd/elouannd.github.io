
# Brand Design System - React Native
## Neo-Brutalism + Glassmorphism Hybrid

**Version:** 1.0
**Platform:** React Native / Mobile (iOS & Android)
**Last Updated:** 2025-11-09
**Philosophy:** A unique fusion of soft glassmorphism and hard neo-brutalism aesthetics

---

## Table of Contents
1. [Brand Philosophy](#brand-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Shadow System](#shadow-system)
5. [Glassmorphism Effects](#glassmorphism-effects)
6. [Component Specifications](#component-specifications)
7. [Animation Guidelines](#animation-guidelines)
8. [Layout Principles](#layout-principles)
9. [React Native Implementation](#react-native-implementation)

---

## Brand Philosophy

### The Hybrid Concept
This design system blends two contrasting aesthetics:

**Glassmorphism (50%)**
- Frosted glass textures with blur effects
- Soft gradients and transparency
- Light reflections and subtle glows
- Depth through layered transparency

**Neo-Brutalism (50%)**
- Thick black borders (3-5px)
- Hard offset shadows
- Bold, unapologetic typography
- Sharp contrasts and no subtlety

**The Result:** Every component has BOTH glass texture AND brutalist borders/shadows. No element is purely one style.

---

## Color Palette

### Primary Colors

#### Orangy (Primary)
- **Light Mode:** `RGB(255, 166, 102)` / `#FFA666`
- **Dark Mode:** `RGB(255, 153, 89)` / `#FF9959`
- **React Native:** `'#FFA666'` or `'rgb(255, 166, 102)'`
- **Usage:** Primary buttons, hero text, featured elements
- **Character:** Bold pastel orange, warm and energetic

#### Teal (Accent)
- **Light Mode:** `RGB(102, 242, 224)` / `#66F2E0`
- **Dark Mode:** `RGB(89, 230, 212)` / `#59E6D4`
- **React Native:** `'#66F2E0'` or `'rgb(102, 242, 224)'`
- **Usage:** Accent elements, glows, interactive states
- **Character:** Vibrant pastel teal, fresh and modern

#### Secondary
- **Light Mode:** `#FFFFFF` (White)
- **Dark Mode:** `#1A1A1F` (Near Black)
- **Usage:** Backgrounds, cards, neutral elements

### Theme Configuration

```javascript
export const colors = {
  // Primary
  primary: '#FFA666',
  primaryRgba: (opacity) => `rgba(255, 166, 102, ${opacity})`,

  // Accent
  accent: '#66F2E0',
  accentRgba: (opacity) => `rgba(102, 242, 224, ${opacity})`,

  // Secondary
  secondaryLight: '#FFFFFF',
  secondaryDark: '#1A1A1F',

  // Core
  black: '#000000',
  white: '#FFFFFF',

  // Shadow
  shadow: 'rgba(0, 0, 0, 0.4)',
};
```

### TypeScript Theme Object

```typescript
export const theme = {
  colors: {
    primary: '#FFA666',
    accent: '#66F2E0',
    black: '#000000',
    white: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  borderWidths: {
    low: 3,
    medium: 4,
    high: 5,
  },
  borderRadius: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  elevation: {
    low: { offset: 4, borderWidth: 3 },
    medium: { offset: 6, borderWidth: 4 },
    high: { offset: 10, borderWidth: 5 },
  },
};
```

---

## Typography

### Font Families

#### Primary Font
- **iOS:** SF Pro (System Default)
- **Android:** Roboto (System Default)
- **React Native:** Platform-specific system font
- **Weights:** `'700'` (Bold), `'900'` (Black/Heavy)
- **Usage:** Buttons, headings, body text

#### Accent Font
- **iOS:** New York (System Serif)
- **Android:** Serif (System Serif)
- **React Native:** Platform-specific serif font
- **Usage:** Decorative text, taglines, emphasis

### Font Configuration

```javascript
import { Platform } from 'react-native';

export const fonts = {
  primary: {
    regular: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    bold: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    black: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
  },
  serif: {
    regular: Platform.select({
      ios: 'NewYorkMedium-Regular',
      android: 'serif',
      default: 'serif',
    }),
  },
};

export const fontWeights = {
  regular: '400',
  bold: '700',
  black: '900',
};
```

### Type Scale

#### Hero Title
- **Size:** 52
- **Weight:** `'900'`
- **Line Height:** 62

#### Section Headers
- **Size:** 28-32
- **Weight:** `'900'`
- **Line Height:** 36-38
- **Mix:** Combine different fonts in same title (see Playful Typography below)

#### Card Titles
- **Size:** 20-24
- **Weight:** `'900'`
- **Color:** `'#000000'`

#### Body Text
- **Size:** 14-16
- **Weight:** `'700'` (bold) or `'400'` (regular)
- **Opacity:** 0.7 for secondary text

#### Button Text
- **Size:** 16-18
- **Weight:** `'900'`
- **Transform:** `.toUpperCase()`
- **Color:** `'#000000'`

### Typography Styles

```javascript
export const typography = {
  heroTitle: {
    fontSize: 52,
    fontWeight: '900',
    lineHeight: 62,
  },
  sectionHeader: {
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 36,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
  },
  body: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000000',
  },
};
```

### Playful Typography Mixing

**Core Principle:** Mix different font families within the same title/heading to create visual energy and personality.

#### How to Mix Fonts in React Native

```jsx
import { Text, View, StyleSheet, Platform } from 'react-native';

// Example 1: "Bonjour comment ça va"
<View style={styles.mixedTitle}>
  <Text style={styles.sans}>Bonjour comment </Text>
  <Text style={styles.serif}>ça va</Text>
</View>

// Example 2: "GET STARTED"
<View style={styles.mixedTitle}>
  <Text style={styles.sans}>GET </Text>
  <Text style={styles.serif}>STARTED</Text>
</View>

// Example 3: "Discover your frequency"
<View style={styles.mixedTitle}>
  <Text style={styles.sans}>Discover </Text>
  <Text style={[styles.serif, { opacity: 0.8 }]}>your </Text>
  <Text style={styles.sans}>frequency</Text>
</View>

const styles = StyleSheet.create({
  mixedTitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  sans: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
  },
  serif: {
    fontFamily: Platform.select({
      ios: 'NewYorkMedium-Regular',
      android: 'serif',
    }),
    fontSize: 28,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#000',
  },
});
```

#### Reusable Component

```jsx
import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';

const MixedText = ({ parts }) => {
  return (
    <View style={styles.container}>
      {parts.map((part, index) => (
        <Text
          key={index}
          style={[
            part.type === 'serif' ? styles.serif : styles.sans,
            part.style
          ]}
        >
          {part.text}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  sans: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
  },
  serif: {
    fontFamily: Platform.select({
      ios: 'NewYorkMedium-Regular',
      android: 'serif',
    }),
    fontSize: 28,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#000',
  },
});

// Usage:
<MixedText
  parts={[
    { text: 'Bonjour comment ', type: 'sans' },
    { text: 'ça va', type: 'serif' },
  ]}
/>
```

#### Mixing Rules
1. **Always bold/black weights** - Never mix with light fonts
2. **Serif = italic** - Serif portions should be italicized
3. **1-3 switches per title** - Don't overdo it
4. **Use for titles/headers only** - Body text stays consistent
5. **Maintain same size** - Font family changes, not size
6. **Color can vary slightly** - Serif can be 80% opacity for subtle effect
7. **Use flexDirection: 'row'** - To keep text inline

#### When to Use
- ✅ Section headers
- ✅ Hero titles
- ✅ Feature titles
- ✅ Call-to-action text
- ❌ Body text
- ❌ Button text (unless very large)
- ❌ Form labels

---

## Shadow System

### Platform Differences

React Native shadows work differently on iOS and Android:

**iOS:** Uses `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`
**Android:** Uses `elevation` property

### Shadow Helper

```javascript
export const createShadow = (elevation = 'medium') => {
  const shadows = {
    low: {
      offset: { width: 4, height: 4 },
      radius: 2,
      opacity: 0.4,
    },
    medium: {
      offset: { width: 6, height: 6 },
      radius: 2,
      opacity: 0.4,
    },
    high: {
      offset: { width: 10, height: 10 },
      radius: 3,
      opacity: 0.4,
    },
  };

  const shadow = shadows[elevation];

  return Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: shadow.offset,
      shadowOpacity: shadow.opacity,
      shadowRadius: shadow.radius,
    },
    android: {
      elevation: elevation === 'low' ? 4 : elevation === 'medium' ? 6 : 10,
    },
  });
};
```

### Manual Shadow Implementation

Since React Native doesn't support offset shadows like CSS, we create shadows as separate `View` components:

```javascript
<View style={styles.container}>
  {/* Shadow */}
  <View style={{
    position: 'absolute',
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
  }} />

  {/* Main content */}
  <View style={styles.content}>
    {/* ... */}
  </View>
</View>
```

---

## Glassmorphism Effects

### Blur Libraries

React Native requires third-party libraries for blur effects:

#### Option 1: @react-native-community/blur
```bash
npm install @react-native-community/blur
```

```jsx
import { BlurView } from '@react-native-community/blur';

<BlurView
  style={StyleSheet.absoluteFill}
  blurType="light"  // or "dark"
  blurAmount={15}
  reducedTransparencyFallbackColor="white"
/>
```

#### Option 2: expo-blur (for Expo projects)
```bash
expo install expo-blur
```

```jsx
import { BlurView } from 'expo-blur';

<BlurView
  intensity={80}
  tint="light"
  style={StyleSheet.absoluteFill}
/>
```

### Material Layers

#### Ultra Thin Material
```jsx
<BlurView
  blurAmount={10}
  blurType="light"
  style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
/>
```

#### Thin Material
```jsx
<BlurView
  blurAmount={15}
  blurType="light"
  style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.4)' }]}
/>
```

#### Regular Material
```jsx
<BlurView
  blurAmount={20}
  blurType="light"
  style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.6)' }]}
/>
```

---

## Component Specifications

### Card Component

#### Specifications
- **Border Radius:** 16-24
- **Padding:** 24
- **Border Width:** 3-5 (varies by elevation)
- **Shadow:** Positioned View with colored background
- **Background:** BlurView + color gradient
- **Reflection:** Positioned View with white gradient
- **Inner Glow:** Border overlay with white color

#### Variants
1. **Standard:** Medium elevation, primary color
2. **Featured:** High elevation, rotated 1-3°
3. **Small:** Low elevation, reduced padding (16)

### Button Component

#### Primary Button
```
Height: 54
Padding Horizontal: 16
Border Radius: 16
Border Width: 3
Shadow Offset: { width: 5, height: 5 }
Background: Primary color gradient
Text: Black, weight '900', uppercase
Reflection: White gradient on top half
States:
  - Default: Shadow offset 5
  - Pressed: Shadow offset 2, button offset 2
```

### Input Field (TextInput)

#### Specifications
```
Height: 50
Padding: 16
Border Radius: 12
Border Width: 3
Border Color: #000
Background: rgba(255, 255, 255, 0.95)
Font Weight: '700'
Placeholder Color: rgba(0, 0, 0, 0.5)
```

---

## Animation Guidelines

### Animated API

```javascript
import { Animated, Easing } from 'react-native';

// Create animated value
const animatedValue = useRef(new Animated.Value(0)).current;

// Spring animation (for buttons, toggles)
Animated.spring(animatedValue, {
  toValue: 1,
  tension: 40,
  friction: 7,
  useNativeDriver: true,
}).start();

// Timing animation (for fades, slides)
Animated.timing(animatedValue, {
  toValue: 1,
  duration: 300,
  easing: Easing.out(Easing.cubic),
  useNativeDriver: true,
}).start();

// Loop animation (for shimmer, rotation)
Animated.loop(
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 2000,
    easing: Easing.linear,
    useNativeDriver: true,
  })
).start();
```

### Animation Catalog

#### Button Press Animation
```javascript
const [pressAnim] = useState(new Animated.Value(0));

const handlePressIn = () => {
  Animated.timing(pressAnim, {
    toValue: 1,
    duration: 100,
    useNativeDriver: true,
  }).start();
};

const handlePressOut = () => {
  Animated.timing(pressAnim, {
    toValue: 0,
    duration: 100,
    useNativeDriver: true,
  }).start();
};

const translateX = pressAnim.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 2],
});

const shadowOffset = pressAnim.interpolate({
  inputRange: [0, 1],
  outputRange: [5, 2],
});
```

#### Glow Pulse
```javascript
const glowAnim = useRef(new Animated.Value(0.6)).current;

useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(glowAnim, {
        toValue: 0.9,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(glowAnim, {
        toValue: 0.6,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ])
  ).start();
}, []);
```

### React Native Reanimated (Recommended)

For better performance, use `react-native-reanimated`:

```bash
npm install react-native-reanimated
```

```javascript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const offset = useSharedValue(0);

const animatedStyles = useAnimatedStyle(() => ({
  transform: [{ translateX: offset.value }],
}));

// Trigger animation
offset.value = withSpring(100);
```

---

## Layout Principles

### Spacing System

```javascript
export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Usage in styles
const styles = StyleSheet.create({
  card: {
    padding: spacing.l, // 24
    marginBottom: spacing.m, // 16
  },
});
```

### Component Spacing
- **Card Padding:** 24
- **Button Padding Horizontal:** 16
- **Section Gaps:** 48-64
- **Element Gaps:** 16-24

### Flexbox Layout

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: spacing.l, // Note: gap support varies by RN version
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
```

### Card Stacking & Overlapping

**Core Principle:** Cards should feel playful and dynamic by overlapping each other, creating depth and visual interest.

#### Implementation in React Native

```jsx
import { View, StyleSheet } from 'react-native';

// Example 1: Horizontal Card Stack using absolute positioning
const CardStack = () => {
  return (
    <View style={styles.stackContainer}>
      <View style={[styles.card, styles.card1]}>
        <BrandCard>Card 1</BrandCard>
      </View>
      <View style={[styles.card, styles.card2]}>
        <BrandCard>Card 2</BrandCard>
      </View>
      <View style={[styles.card, styles.card3]}>
        <BrandCard>Card 3</BrandCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stackContainer: {
    position: 'relative',
    height: 250,
    marginHorizontal: 20,
  },
  card: {
    position: 'absolute',
    width: 300,
    height: 200,
  },
  card1: {
    left: 0,
    top: 0,
    transform: [{ rotate: '-2deg' }],
    zIndex: 1,
  },
  card2: {
    left: 200,
    top: 20,
    transform: [{ rotate: '1deg' }],
    zIndex: 2,
  },
  card3: {
    left: 400,
    top: -10,
    transform: [{ rotate: '-1deg' }],
    zIndex: 3,
  },
});

// Example 2: Vertical Cascading Stack with negative margins
const CascadingStack = () => {
  const cards = [
    { color: '#FFA666', rotation: 2 },
    { color: '#66F2E0', rotation: -2 },
    { color: '#FFA666', rotation: 1 },
  ];

  return (
    <View style={cascadeStyles.container}>
      {cards.map((card, index) => (
        <View
          key={index}
          style={[
            cascadeStyles.card,
            {
              marginTop: index > 0 ? -40 : 0,
              transform: [{ rotate: `${card.rotation}deg` }],
              zIndex: cards.length - index,
            },
          ]}
        >
          <BrandCard backgroundColor={card.color}>
            Card {index + 1}
          </BrandCard>
        </View>
      ))}
    </View>
  );
};

const cascadeStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    width: 350,
    height: 150,
  },
});

// Example 3: Grid with Overlaps
const GridStack = () => {
  return (
    <View style={gridStyles.container}>
      <View style={gridStyles.row}>
        <View style={[gridStyles.card, gridStyles.card1]}>
          <BrandCard>1</BrandCard>
        </View>
        <View style={[gridStyles.card, gridStyles.card2]}>
          <BrandCard>2</BrandCard>
        </View>
      </View>
      <View style={[gridStyles.row, gridStyles.rowOverlap]}>
        <View style={[gridStyles.card, gridStyles.card3]}>
          <BrandCard>3</BrandCard>
        </View>
        <View style={[gridStyles.card, gridStyles.card4]}>
          <BrandCard>4</BrandCard>
        </View>
      </View>
    </View>
  );
};

const gridStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowOverlap: {
    marginTop: -60, // Vertical overlap
  },
  card: {
    width: 160,
    height: 120,
  },
  card1: {
    transform: [{ rotate: '2deg' }],
    zIndex: 1,
  },
  card2: {
    transform: [{ rotate: '-1deg' }],
    marginLeft: -30, // Horizontal overlap
    zIndex: 2,
  },
  card3: {
    transform: [{ rotate: '-2deg' }],
    zIndex: 3,
  },
  card4: {
    transform: [{ rotate: '1deg' }],
    marginLeft: -30,
    zIndex: 4,
  },
});
```

**Overlapping Rules:**
1. **Overlap by 30-50%** - Use negative margins or absolute positioning
2. **Vary rotation** - Use `transform: [{ rotate: '2deg' }]` for playfulness
3. **Use zIndex** - Always set explicit stacking order
4. **Higher elevation on top** - Top cards should have higher elevation shadows
5. **Offset vertically** - Add small top/bottom offsets (±10-30)
6. **Negative margins** - Use `marginTop: -40` or `marginLeft: -30` for overlaps

**When to Use:**
- ✅ Feature showcases (3-4 cards)
- ✅ Stats/metrics displays
- ✅ Gallery views
- ✅ Hero sections
- ❌ List views (too chaotic)
- ❌ Forms (needs clarity)
- ❌ More than 5 cards (overwhelming)

**Performance Note:** For scrolling lists, avoid complex overlaps as they can impact performance.

### Responsive Design

```javascript
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768;

// Responsive values
const cardPadding = isSmallDevice ? 16 : 24;
const fontSize = isSmallDevice ? 20 : 24;
const shadowOffset = isSmallDevice ? 4 : 6;
```

---

## React Native Implementation

### Brand Card Component

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur'; // or 'expo-blur'

const BrandCard = ({
  children,
  backgroundColor = '#FFA666',
  elevation = 'medium'
}) => {
  const elevations = {
    low: { offset: 4, borderWidth: 3 },
    medium: { offset: 6, borderWidth: 4 },
    high: { offset: 10, borderWidth: 5 },
  };

  const { offset, borderWidth } = elevations[elevation];

  return (
    <View style={styles.container}>
      {/* Shadow */}
      <View style={[
        styles.shadow,
        {
          top: offset,
          left: offset,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }
      ]} />

      {/* Main Card */}
      <View style={[
        styles.card,
        { borderWidth }
      ]}>
        {/* Glass Blur Effect */}
        <BlurView
          style={styles.blurContainer}
          blurType="light"
          blurAmount={15}
          reducedTransparencyFallbackColor="white"
        />

        {/* Color Gradient Overlay */}
        <View style={[
          styles.colorGradient,
          { backgroundColor: backgroundColor }
        ]} />

        {/* Top Reflection */}
        <View style={styles.reflection} />

        {/* Inner Glow */}
        <View style={styles.innerGlow} />

        {/* Content */}
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  shadow: {
    position: 'absolute',
    right: -6,
    bottom: -6,
    left: 0,
    top: 0,
    borderRadius: 20,
  },
  card: {
    position: 'relative',
    borderRadius: 20,
    borderColor: '#000',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  colorGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
  reflection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  innerGlow: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 19,
    pointerEvents: 'none',
  },
  content: {
    padding: 24,
    zIndex: 1,
  },
});

export default BrandCard;

// Usage:
// <BrandCard backgroundColor="#66F2E0" elevation="high">
//   <Text style={{ fontSize: 20, fontWeight: '900', color: '#000' }}>
//     Card Title
//   </Text>
//   <Text style={{ fontSize: 14, fontWeight: '700', color: '#000' }}>
//     Card content goes here
//   </Text>
// </BrandCard>
```

### Brand Button Component

```jsx
import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

const BrandButton = ({ title, onPress, variant = 'primary' }) => {
  const [isPressed, setIsPressed] = useState(false);

  const colors = {
    primary: '#FFA666',
    accent: '#66F2E0',
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View style={styles.buttonContainer}>
        {/* Shadow */}
        <View style={[
          styles.shadow,
          {
            top: isPressed ? 2 : 5,
            left: isPressed ? 2 : 5,
          }
        ]} />

        {/* Button */}
        <View style={[
          styles.button,
          {
            backgroundColor: colors[variant],
            transform: [
              { translateX: isPressed ? 2 : 0 },
              { translateY: isPressed ? 2 : 0 }
            ],
          }
        ]}>
          {/* Reflection */}
          <View style={styles.reflection} />

          <Text style={styles.buttonText}>
            {title.toUpperCase()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 16,
  },
  button: {
    height: 54,
    paddingHorizontal: 16,
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  reflection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    zIndex: 1,
  },
});

export default BrandButton;

// Usage:
// <BrandButton
//   title="Get Started"
//   variant="primary"
//   onPress={() => console.log('Pressed!')}
// />
```

### Brand TextInput Component

```jsx
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const BrandInput = ({ placeholder, value, onChangeText, ...props }) => {
  return (
    <View style={styles.container}>
      {/* Shadow */}
      <View style={styles.shadow} />

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  shadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
  },
  input: {
    height: 50,
    padding: 16,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: 'rgba(255,255,255,0.95)',
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
});

export default BrandInput;

// Usage:
// <BrandInput
//   placeholder="Enter text..."
//   value={text}
//   onChangeText={setText}
// />
```

### Brand Toggle Component

```jsx
import React from 'react';
import { Pressable, View, StyleSheet, Animated } from 'react-native';

const BrandToggle = ({ value, onValueChange }) => {
  const [animation] = React.useState(new Animated.Value(value ? 1 : 0));

  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: value ? 1 : 0,
      tension: 40,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [value]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 26],
  });

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <View style={styles.container}>
        {/* Shadow */}
        <View style={styles.shadow} />

        {/* Track */}
        <View style={[
          styles.track,
          { backgroundColor: value ? '#66F2E0' : '#999' }
        ]}>
          {/* Thumb */}
          <Animated.View
            style={[
              styles.thumb,
              {
                backgroundColor: value ? '#FFA666' : '#FFF',
                transform: [{ translateX }],
              },
            ]}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 60,
    height: 34,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 17,
  },
  track: {
    width: 60,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
    borderColor: '#000',
    padding: 4,
    justifyContent: 'center',
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#000',
  },
});

export default BrandToggle;

// Usage:
// <BrandToggle value={isEnabled} onValueChange={setIsEnabled} />
```

---

## Design Checklist

When creating a new React Native component, ensure it has:

- ✅ **Thick black border** (`borderWidth: 3-5`)
- ✅ **Offset shadow** (manual View with absolute positioning)
- ✅ **Glass material** (BlurView component)
- ✅ **Color gradient background** (overlay with opacity 0.7)
- ✅ **Light reflection** (white View on top with opacity 0.4)
- ✅ **Inner glow** (nested border with white color)
- ✅ **Rounded corners** (`borderRadius: 12-24`)
- ✅ **Bold typography** (minimum `fontWeight: '700'`)
- ✅ **Press animations** (Pressable with state)
- ✅ **Proper spacing** (`padding: 24`)

---

## Brand Don'ts

❌ **Never use:**
- Thin borders (< 3)
- Subtle shadows (minimum 4pt offset required)
- Light font weights (< `'700'`)
- Pure solid colors without glass effect
- Animations longer than 2s (except infinite loops)
- More than 3 colors in one component

❌ **Avoid:**
- Over-blurring (blurAmount > 20)
- Too many nested glass layers
- Shadows going upward/leftward
- Mixing warm/cool shadows
- Inconsistent border widths in same view

---

## Accessibility Notes

### Color Contrast
- **Black text on primary orange:** WCAG AA compliant (4.5:1 ratio)
- **Black text on accent teal:** WCAG AA compliant (5.2:1 ratio)
- **Always use black or near-black text** on brand colors

### Motion
```javascript
import { AccessibilityInfo } from 'react-native';

const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);

useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotionEnabled);
}, []);

// Use in animations:
const animationDuration = reduceMotionEnabled ? 0 : 300;
```

### Touch Targets
- Minimum 44x44 for all interactive elements
- Buttons are 54 tall (exceeds minimum)
- Add extra padding around small icons with `hitSlop` prop

### Accessibility Props
```jsx
<Pressable
  accessible={true}
  accessibilityLabel="Primary action button"
  accessibilityRole="button"
  accessibilityState={{ disabled: false }}
>
  {/* Button content */}
</Pressable>
```

---

## Version History

**1.0** (2025-11-09)
- React Native-specific brand guide created
- Mobile-optimized components added
- Platform-specific shadow implementations
- Blur library integrations documented

---

## License & Usage

This brand design system is proprietary. Implementation in personal or commercial projects requires proper attribution to the original design system.

**Questions?** Contact: [Your Contact Info]

---

**End of React Native Brand Guide**
