# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# ==== React Native core ====
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
    @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>;
}

# ==== Reanimated & Worklets ====
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }
-keep class com.swmansion.worklets.** { *; }
-keep class com.facebook.react.bridge.** { *; }

# ==== Hermes (when not using JSC) ====
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.hermes.reactexecutor.** { *; }

# ==== Skia (Shopify) ====
-keep class com.shopify.reactnative.skia.** { *; }
-dontwarn com.shopify.reactnative.skia.**

# ==== Three.js / GL / Three ====
-keep class expo.modules.three.** { *; }
-keep class expo.modules.gl.** { *; }
-keep class org.tres.** { *; }
-dontwarn org.tres.**

# ==== RevenueCat (Purchases) ====
-keep class com.revenuecat.purchases.** { *; }
-keepclassmembers class com.revenuecat.purchases.** { *; }
-dontwarn com.revenuecat.purchases.**

# ==== Sentry ====
-keep class io.sentry.** { *; }
-dontwarn io.sentry.**

# ==== MMKV ====
-keep class com.mrousavy.mmkv.** { *; }
-keep class com.tencent.mmkv.** { *; }

# ==== WebView ====
-keep class com.reactnativecommunity.webview.** { *; }

# ==== AsyncStorage ====
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# ==== NetInfo ====
-keep class com.reactnativecommunity.netinfo.** { *; }

# ==== Gesture Handler ====
-keep class com.swmansion.gesturehandler.** { *; }
-keep class com.facebook.react.gesturehandler.** { *; }

# ==== Screens ====
-keep class com.swmansion.rnscreens.** { *; }

# ==== Safe Area Context ====
-keep class com.th3rdwave.safeareacontext.** { *; }

# ==== SVG ====
-keep class com.horcrux.svg.** { *; }

# ==== Expo Modules (generic catch-all) ====
-keep class expo.modules.** { *; }
-dontwarn expo.modules.**
-keep class expo.core.** { *; }

# ==== Keep all Kotlin metadata ====
-keep class kotlin.Metadata { *; }
-keepclassmembers class **$WhenMappings {
    <fields>;
}

# ==== Keep custom application class ====
-keep public class com.bryyzxm.neuralempire.MainApplication { *; }
-keep public class com.bryyzxm.neuralempire.MainActivity { *; }

# ==== Strip log calls in release (smaller dex) ====
-assumenosideeffects class android.util.Log {
    public static *** v(...);
    public static *** d(...);
    public static *** i(...);
}
