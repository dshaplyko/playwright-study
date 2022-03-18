import { HK_CONFIG, AM_CONFIG, PDAX_CONFIG, OAT_CONFIG } from "../configs";

export const landingPageFooterMap = [
  {
    name: "should render landing page for SG domain @smoke @jira(BCTGWEBPWU-411)",
    config: null,
    disclaimer: "Contact Details",
    isAboutUsVisible: true,
    isHelpVisible: true,
    isContactUsVisible: true,
    isAccountInformationVisible: false,
    isContactUsBannerVisible: true,
    isMarketInsightsVisible: true,
    isAnnouncementsVisible: true,
  },
  {
    name: "should render landing page for HK domain @criticalPath @jira(BCTGWEBPWU-440)",
    config: HK_CONFIG,
    disclaimer: "DISCLAIMER",
    isAboutUsVisible: false,
    isHelpVisible: true,
    isContactUsVisible: false,
    isAccountInformationVisible: true,
    isContactUsBannerVisible: true,
    isMarketInsightsVisible: false,
    isAnnouncementsVisible: false,
  },
  {
    name: "should render landing page for AM domain @criticalPath @jira(BCTGWEBPWU-441)",
    config: AM_CONFIG,
    disclaimer: "DISCLAIMER",
    isAboutUsVisible: true,
    isHelpVisible: true,
    isContactUsVisible: true,
    isAccountInformationVisible: false,
    isContactUsBannerVisible: true,
    isMarketInsightsVisible: false,
    isAnnouncementsVisible: false,
  },
  {
    name: "should render landing page for PDAX domain @criticalPath @jira(BCTGWEBPWU-442)",
    config: PDAX_CONFIG,
    disclaimer: "DISCLAIMER",
    isAboutUsVisible: true,
    isHelpVisible: true,
    isContactUsVisible: true,
    isAccountInformationVisible: false,
    isContactUsBannerVisible: true,
    isMarketInsightsVisible: true,
    isAnnouncementsVisible: true,
  },
  {
    name: "should render landing page for OAT domain @criticalPath @jira(BCTGWEBPWU-443)",
    config: OAT_CONFIG,
    disclaimer: "DISCLAIMER",
    isAboutUsVisible: false,
    isHelpVisible: true,
    isContactUsVisible: true,
    isAccountInformationVisible: false,
    isContactUsBannerVisible: true,
    isMarketInsightsVisible: true,
    isAnnouncementsVisible: true,
  },
];

export const landingPageMaintenanceMap = [
  {
    name: "should display maintenance banner when features.site.enabled = false @extended @jira(BCTGWEBPWU-757)",
    config: {
      features: {
        site: {
          enabled: false,
        },
      },
    },
    message:
      /The platform is currently undergoing maintenance. Services will resume when maintenance is complete. For additional assistance please contact support/,
  },
  {
    name: "should display maintenance banner when features.site.maintenanceBanner.enabled = true @extended @jira(BCTGWEBPWU-758)",
    config: {
      site: {
        maintenanceBanner: {
          enabled: true,
        },
      },
    },
    message: /Resting order will be reinstated after the maintenance./,
  },
];
