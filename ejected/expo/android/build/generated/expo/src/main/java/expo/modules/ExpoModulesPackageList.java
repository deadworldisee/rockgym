package expo.modules;

import java.util.Arrays;
import java.util.List;
import expo.modules.core.interfaces.Package;
import expo.modules.kotlin.modules.Module;
import expo.modules.kotlin.ModulesProvider;

public class ExpoModulesPackageList implements ModulesProvider {
  private static class LazyHolder {
    static final List<Package> packagesList = Arrays.<Package>asList(
      new expo.modules.adapters.react.ReactAdapterPackage(),
      new expo.modules.application.ApplicationPackage(),
      new expo.modules.av.AVPackage(),
      new expo.modules.constants.ConstantsPackage(),
      new expo.modules.core.BasePackage(),
      new expo.modules.filesystem.FileSystemPackage(),
      new expo.modules.font.FontLoaderPackage(),
      new expo.modules.keepawake.KeepAwakePackage(),
      new expo.modules.splashscreen.SplashScreenPackage(),
      new expo.modules.updates.UpdatesPackage()
    );

    static final List<Class<? extends Module>> modulesList = Arrays.<Class<? extends Module>>asList(
            expo.modules.av.video.VideoViewModule.class,
      expo.modules.constants.ConstantsModule.class,
      expo.modules.easclient.EASClientModule.class
    );
  }

  public static List<Package> getPackageList() {
    return LazyHolder.packagesList;
  }

  @Override
  public List<Class<? extends Module>> getModulesList() {
    return LazyHolder.modulesList;
  }
}
