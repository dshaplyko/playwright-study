import { test } from "../../po/pages";
import { FEATURE_HIGHLIGHT, featureHighlightMap } from "../../config";
import { expectElementVisibility } from "../../utils";

test.describe("Portfolio - Feature highlight widgets @jira(PWU-108)", () => {
  featureHighlightMap.forEach(({ testName, config }) => {
    test(`should display ${testName} as a feature highlight @criticalPath`, async ({ portfolioPage }) => {
      await portfolioPage.mockFeatureHighlight(config);
      await expectElementVisibility(portfolioPage.getFeatureHighlight(FEATURE_HIGHLIGHT[config[0]]).rootEl, true);
    });
  });
});
