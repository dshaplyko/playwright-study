export const landingPageFooterMap = [
  {
    name: "should turn ON features on the landing page @smoke @jira(XRT-271)",
    config: {
      aboutUs: true,
      contacts: true,
      faq: true,
      security: true,
      privacy: true,
      terms: true,
      marketInsight: true,
      announcements: true,
      disclaimer: "Contact Details",
    },
  },
  {
    name: "should turn OFF features on the landing page @smoke @jira(XRT-272)",
    config: {
      aboutUs: false,
      contacts: false,
      faq: false,
      security: false,
      privacy: false,
      terms: false,
      marketInsight: false,
      announcements: false,
      disclaimer: "DISKLAIMER",
    },
  },
];

export const landingPageMaintenanceMap = [
  {
    name: "should display maintenance banner when features.site.enabled = false @extended @jira(XRT-279)",
    config: {
      isEnabled: false,
      isMaitenanceBannerDisplayed: false,
      isDisplayedUnsettled: true,
    },
    message:
      /The platform is currently undergoing maintenance. Services will resume when maintenance is complete. For additional assistance please contact support/,
  },
  {
    name: "should display maintenance banner when features.site.maintenanceBanner.enabled = true @extended @jira(XRT-280)",
    config: {
      isEnabled: true,
      isMaitenanceBannerDisplayed: true,
      isDisplayedUnsettled: true,
    },
    message: /Resting order will be reinstated after the maintenance./,
  },
];
