export const configEquivalences = {
  pattern: 'Default index pattern to use on the app.',
  'checks.pattern':
    'Enable or disable the index pattern health check when opening the app.',
  'checks.template':
    'Enable or disable the template health check when opening the app.',
  'checks.api': 'Enable or disable the API health check when opening the app.',
  'checks.setup':
    'Enable or disable the setup health check when opening the app.',
  'checks.fields':
    'Enable or disable the known fields health check when opening the app.',
  'extensions.pci': 'Enable or disable the PCI DSS tab on Overview and Agents.',
  'extensions.gdpr': 'Enable or disable the GDPR tab on Overview and Agents.',
  'extensions.audit': 'Enable or disable the Audit tab on Overview and Agents.',
  'extensions.oscap':
    'Enable or disable the Open SCAP tab on Overview and Agents.',
  'extensions.ciscat':
    'Enable or disable the CIS-CAT tab on Overview and Agents.',
  'extensions.aws': 'Enable or disable the Amazon (AWS) tab on Overview.',
  'extensions.gcp': 'Enable or disable the Google Cloud Platform tab on Overview.',
  'extensions.virustotal':
    'Enable or disable the VirusTotal tab on Overview and Agents.',
  'extensions.osquery':
    'Enable or disable the Osquery tab on Overview and Agents.',
  'extensions.mitre': 'Enable or disable the MITRE tab on Overview and Agents.',
  'extensions.docker':
    'Enable or disable the Docker listener tab on Overview and Agents.',
  timeout:
    'Defines the maximum time the app will wait for an API response when making requests to it.',
  'api.selector':
    'Defines if the user is allowed to change the selected API directly from the top menu bar.',
  'ip.selector':
    'Defines if the user is allowed to change the selected index pattern directly from the top menu bar.',
  'ip.ignore':
    'Disable certain index pattern names from being available in index pattern selector from the Wazuh app.',
  'xpack.rbac.enabled':
    'Enable or disable X-Pack RBAC security capabilities when using the app.',
  'wazuh.monitoring.enabled':
    'Enable or disable the wazuh-monitoring index creation and/or visualization.',
  'wazuh.monitoring.frequency':
    'Define in seconds the frequency the app generates a new document on the wazuh-monitoring index.',
  'wazuh.monitoring.shards':
    'Define the number of shards to use for the wazuh-monitoring-3.x-* indices.',
  'wazuh.monitoring.replicas':
    'Define the number of replicas to use for the wazuh-monitoring-3.x-* indices.',
  'wazuh.monitoring.creation':
    'Define the interval in which the wazuh-monitoring index will be created.',
  'wazuh.monitoring.pattern':
    'Default index pattern to use on the app for Wazuh monitoring.',
  admin:
    'Enable or disable administrator requests to the Wazuh API when using the app.',
  hideManagerAlerts:
    'Hide the alerts of the manager in all dashboards and discover',
  'logs.level':
    'Set the app logging level, allowed values are info and debug. Default is info.',
  'cron.prefix':
    'Define the index prefix of predefined jobs'
};

export const nameEquivalence = {
  pattern: 'Index pattern',
  'checks.pattern': 'Index pattern',
  'checks.template': 'Index template',
  'checks.api': 'API connection',
  'checks.setup': 'API version',
  'checks.fields': 'Know fields',
  timeout: 'Request timeout',
  'api.selector': 'API selector',
  'ip.selector': 'IP selector',
  'ip.ignore': 'IP ignore',
  'xpack.rbac.enabled': 'X-Pack RBAC',
  'wazuh.monitoring.enabled': 'Status',
  'wazuh.monitoring.frequency': 'Frecuency',
  'wazuh.monitoring.shards': 'Index shards',
  'wazuh.monitoring.replicas': 'Index replicas',
  'wazuh.monitoring.creation': 'Interval creation',
  'wazuh.monitoring.pattern': 'Index pattern',
  admin: 'Admin mode',
  hideManagerAlerts: 'Hide manager alerts',
  'logs.level': 'Log level',
}

const HEALTH_CHECK = 'Health Check';
const GENERAL = 'General';
const SECURITY = 'Security';
const MONITORING = 'Monitoring'
export const categoriesNames = [HEALTH_CHECK, GENERAL, SECURITY, MONITORING,];

export const categoriesEquivalence = {
  pattern: GENERAL,
  'checks.pattern': HEALTH_CHECK,
  'checks.template': HEALTH_CHECK,
  'checks.api': HEALTH_CHECK,
  'checks.setup': HEALTH_CHECK,
  'checks.fields': HEALTH_CHECK,
  timeout: GENERAL,
  'api.selector': GENERAL,
  'ip.selector': GENERAL,
  'ip.ignore': GENERAL,
  'xpack.rbac.enabled': SECURITY,
  'wazuh.monitoring.enabled': MONITORING,
  'wazuh.monitoring.frequency': MONITORING,
  'wazuh.monitoring.shards': MONITORING,
  'wazuh.monitoring.replicas': MONITORING,
  'wazuh.monitoring.creation': MONITORING,
  'wazuh.monitoring.pattern': MONITORING,
  admin: SECURITY,
  hideManagerAlerts: GENERAL,
  'logs.level': GENERAL,
}

const TEXT = 'text';
const NUMBER = 'number';
const LIST = 'list';
const BOOLEAN = 'boolean';
const ARRAY = 'array';

export const formEquivalence = {
  pattern: { type: TEXT },
  'checks.pattern': { type: BOOLEAN },
  'checks.template': { type: BOOLEAN },
  'checks.api': { type: BOOLEAN },
  'checks.setup': { type: BOOLEAN },
  'checks.fields': { type: BOOLEAN },
  timeout: { type: NUMBER },
  'api.selector': { type: BOOLEAN },
  'ip.selector': { type: BOOLEAN },
  'ip.ignore': { type: ARRAY },
  'xpack.rbac.enabled': { type: BOOLEAN },
  'wazuh.monitoring.enabled': { type: BOOLEAN },
  'wazuh.monitoring.frequency': { type: NUMBER },
  'wazuh.monitoring.shards': { type: NUMBER },
  'wazuh.monitoring.replicas': { type: NUMBER },
  'wazuh.monitoring.creation': {
    type: LIST, params: {
      options: [
        { text: 'Hourly', value: 'h' },
        { text: 'Daily', value: 'd' },
        { text: 'Weekly', value: 'w' },
        { text: 'Monthly', value: 'm' },
      ]
    }
  },
  'wazuh.monitoring.pattern': { type: TEXT },
  admin: { type: BOOLEAN },
  hideManagerAlerts: { type: BOOLEAN },
  'logs.level': { type: LIST, params: {
    options: [
      { text: 'Info', value: 'info' },
      { text: 'Debug', value: 'debug' },
    ]
  } },
}