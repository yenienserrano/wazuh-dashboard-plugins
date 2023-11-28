import {
  AppMountParameters,
  CoreSetup,
  CoreStart,
  Plugin,
  PluginInitializerContext,
} from 'opensearch_dashboards/public';
import {
  setDataPlugin,
  setHttp,
  setToasts,
  setUiSettings,
  setChrome,
  setAngularModule,
  setNavigationPlugin,
  setVisualizationsPlugin,
  setSavedObjects,
  setOverlays,
  setScopedHistory,
  setCore,
  setPlugins,
  setCookies,
  setWzMainParams,
  setWzCurrentAppID,
  setWazuhCheckUpdatesPlugin,
  setHeaderActionMenuMounter,
  setWazuhCorePlugin,
} from './kibana-services';
import {
  AppPluginStartDependencies,
  WazuhSetup,
  WazuhSetupPlugins,
  WazuhStart,
  WazuhStartPlugins,
} from './types';
import { Cookies } from 'react-cookie';
import { AppState } from './react-services/app-state';
import { setErrorOrchestrator } from './react-services/common-services';
import { ErrorOrchestratorService } from './react-services/error-orchestrator/error-orchestrator.service';
import store from './redux/store';
import { updateAppConfig } from './redux/actions/appConfigActions';
import {
  initializeInterceptor,
  unregisterInterceptor,
} from './services/request-handler';
import { Applications, Categories } from './utils/applications';
import { syncHistoryLocations } from './kibana-integrations/discover/kibana_services';

const innerAngularName = 'app/wazuh';

export class WazuhPlugin
  implements
    Plugin<WazuhSetup, WazuhStart, WazuhSetupPlugins, WazuhStartPlugins>
{
  constructor(private readonly initializerContext: PluginInitializerContext) {}
  public initializeInnerAngular?: () => void;
  private innerAngularInitialized: boolean = false;
  private hideTelemetryBanner?: () => void;
  public async setup(
    core: CoreSetup,
    plugins: WazuhSetupPlugins,
  ): Promise<WazuhSetup> {
    // Get custom logos configuration to start up the app with the correct logos
    let logosInitialState = {};
    try {
      logosInitialState = await core.http.get(`/api/logos`);
    } catch (error) {
      console.error('plugin.ts: Error getting logos configuration', error);
    }

    // Register the applications
    Applications.forEach(app => {
      const { category, id, title, redirectTo, order } = app;
      core.application.register({
        id,
        title,
        order,
        mount: async (params: AppMountParameters) => {
          try {
            // Set the dynamic redirection
            setWzMainParams(redirectTo());
            setWzCurrentAppID(id);
            initializeInterceptor(core);
            if (!this.initializeInnerAngular) {
              throw Error(
                'Wazuh plugin method initializeInnerAngular is undefined',
              );
            }

            // Update redux app state logos with the custom logos
            if (logosInitialState?.logos) {
              store.dispatch(updateAppConfig(logosInitialState.logos));
            }
            // hide the telemetry banner.
            // Set the flag in the telemetry saved object as the notice was seen and dismissed
            this.hideTelemetryBanner && (await this.hideTelemetryBanner());
            setScopedHistory(params.history);
            // This allows you to add the selectors to the navbar
            setHeaderActionMenuMounter(params.setHeaderActionMenu);
            // Discover currently uses two history instances:
            // one from Kibana Platform and another from history package.
            // Below function is used every time Discover app is loaded to synchronize both instances
            syncHistoryLocations();
            // Load application bundle
            const { renderApp } = await import('./application');
            // Get start services as specified in kibana.json
            const [coreStart, depsStart] = await core.getStartServices();
            setErrorOrchestrator(ErrorOrchestratorService);
            setHttp(core.http);
            setCookies(new Cookies());
            if (!AppState.checkCookies()) {
              window.location.reload();
            }
            await this.initializeInnerAngular();
            params.element.classList.add('dscAppWrapper', 'wz-app');
            const unmount = await renderApp(innerAngularName, params.element);
            return () => {
              unmount();
              unregisterInterceptor();
            };
          } catch (error) {
            console.debug(error);
          }
        },
        category: Categories.find(
          ({ id: categoryID }) => categoryID === category,
        ),
      });
    });
    return {};
  }
  public start(
    core: CoreStart,
    plugins: AppPluginStartDependencies,
  ): WazuhStart {
    // hide security alert
    if (plugins.securityOss) {
      plugins.securityOss.insecureCluster.hideAlert(true);
    }
    if (plugins?.telemetry?.telemetryNotifications?.setOptedInNoticeSeen) {
      // assign to a method to hide the telemetry banner used when the app is mounted
      this.hideTelemetryBanner = () =>
        plugins.telemetry.telemetryNotifications.setOptedInNoticeSeen();
    }
    // we need to register the application service at setup, but to render it
    // there are some start dependencies necessary, for this reason
    // initializeInnerAngular + initializeServices are assigned at start and used
    // when the application/embeddable is mounted
    this.initializeInnerAngular = async () => {
      if (this.innerAngularInitialized) {
        return;
      }
      // this is used by application mount and tests
      const { getInnerAngularModule } = await import('./get_inner_angular');
      const module = getInnerAngularModule(
        innerAngularName,
        core,
        plugins,
        this.initializerContext,
      );
      setAngularModule(module);
      this.innerAngularInitialized = true;
    };
    setCore(core);
    setPlugins(plugins);
    setHttp(core.http);
    setToasts(core.notifications.toasts);
    setDataPlugin(plugins.data);
    setUiSettings(core.uiSettings);
    setChrome(core.chrome);
    setNavigationPlugin(plugins.navigation);
    setVisualizationsPlugin(plugins.visualizations);
    setSavedObjects(core.savedObjects);
    setOverlays(core.overlays);
    setErrorOrchestrator(ErrorOrchestratorService);
    setWazuhCheckUpdatesPlugin(plugins.wazuhCheckUpdates);
    setWazuhCorePlugin(plugins.wazuhCore);
    return {};
  }
}
