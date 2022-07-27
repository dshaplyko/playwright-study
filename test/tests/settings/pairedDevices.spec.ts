import { test } from "../../po/pages";
import { SETTINGS_TABS } from "../../config";
import { expectElementVisibility, expectToHaveCount } from "../../utils";

test.describe("Paired Devices", () => {
  test("should turn ON visibility of paired devices @criticalPath @jira(XRT-599) @jira(XRT-506)", async ({
    settingsPage,
  }) => {
    await settingsPage.mockPairedDevicesSection("ON");
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await expectElementVisibility(settingsPage.activeTab.pairedDevicesSection.rootEl, true);

    const parsedCount = await settingsPage.activeTab.pairedDevicesSection.parseDevicesCount();
    await expectToHaveCount(settingsPage.activeTab.pairedDevicesSection.devices, parsedCount);
  });

  test("should turn OFF visibility of paired devices @criticalPath @jira(XRT-600)", async ({ settingsPage }) => {
    await settingsPage.mockPairedDevicesSection("AUTO");
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await expectElementVisibility(settingsPage.activeTab.pairedDevicesSection.rootEl, false);
  });

  test.skip("should show modal for unparing device @criticalPath @jira(XRT-510) @jira(XRT-513)", async ({
    settingsPage,
  }) => {
    await settingsPage.mockPairedDevicesSection("ON");
    await settingsPage.clickTab(SETTINGS_TABS.SECURITY);
    await settingsPage.activeTab.pairedDevicesSection.unpairDevice(0);
    await expectElementVisibility(settingsPage.unpairDeviceModal.rootEl, true);

    await settingsPage.unpairDeviceModal.buttonCancel.click();
    await expectElementVisibility(settingsPage.unpairDeviceModal.rootEl, false);
  });
});
