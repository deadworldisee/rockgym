#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"RockGymIasi"; // Numele aplicației tale
  self.initialProps = @{}; 

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// ✅ Implementarea metodei bundleURL
- (NSURL *)bundleURL {
#if DEBUG
  // În modul DEBUG, folosește Metro Bundler pentru a încărca bundle-ul
  //return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@".expo/.virtual-metro-entry"];
  return [NSURL URLWithString:@"http://192.168.100.15:8081/index.bundle?platform=ios&dev=true"];

#else
  // În modul RELEASE, încarcă bundle-ul din resursele aplicației
  NSURL *jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  if (!jsCodeLocation) {
      // Log un mesaj dacă bundle-ul nu poate fi găsit
      NSLog(@"Eroare: Nu s-a găsit fișierul main.jsbundle în resurse!");
  }
  return jsCodeLocation;
#endif
}

// ✅ Supradefinire a metodei sourceURLForBridge pentru compatibilitate completă
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
    return [self bundleURL];
}


// ✅ Activare pentru React 18 Concurrent Root (opțional)
- (BOOL)concurrentRootEnabled {
  return true;
}

@end
