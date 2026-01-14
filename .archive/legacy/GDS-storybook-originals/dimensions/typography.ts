import { addPx } from "./utils";
import { css } from "styled-components";

export const _fontSize_ = {
  /** @deprecated fontSize has been deprecated. Maybe **snowdon** textStyle instead */
  centi: 12,
  /** @deprecated fontSize has been deprecated. Maybe **etna** textStyle instead */
  uno: 14,
  /** @deprecated fontSize has been deprecated. Maybe **rainer** textStyle instead */
  hecto: 16,
  /** @deprecated fontSize has been deprecated. Maybe **blanc or fiji** textStyle instead */
  kilo: 18,
  /** @deprecated fontSize has been deprecated. Maybe **vinson or blancDesktop** textStyle instead */
  mega: 20,
  /** @deprecated fontSize has been deprecated. Maybe **kilimanjaro or matterhorn or vinsonDesktop** textStyle instead */
  giga: 23,
  /** @deprecated fontSize has been deprecated. Maybe **kilimanjaro or matterhorn or vinsonDesktop** textStyle instead */
  tera: 26,
  /** @deprecated fontSize has been deprecated. Maybe **everest or kilimanjaroDesktop** textStyle instead */
  peta: 32,
  /** @deprecated fontSize has been deprecated. Maybe **everestDesktop** textStyle instead */
  exa: 54,
} as const;

// I haven't found a way to get the deprecation warnings to work properly alongside
// the addPx function, hence the following are set up in a static object
export const fontSize = {
  /** @deprecated fontSize has been deprecated. Maybe **snowdon** textStyle instead */
  centi: "12px",
  /** @deprecated fontSize has been deprecated. Maybe **etna** textStyle instead */
  uno: "14px",
  /** @deprecated fontSize has been deprecated. Maybe **rainer** textStyle instead */
  hecto: "16px",
  /** @deprecated fontSize has been deprecated. Maybe **blanc or fiji** textStyle instead */
  kilo: "18px",
  /** @deprecated fontSize has been deprecated. Maybe **vinson or blancDesktop** textStyle instead */
  mega: "20px",
  /** @deprecated fontSize has been deprecated. Maybe **kilimanjaro or matterhorn or vinsonDesktop** textStyle instead */
  giga: "23px",
  /** @deprecated fontSize has been deprecated. Maybe **kilimanjaro or matterhorn or vinsonDesktop** textStyle instead */
  tera: "26px",
  /** @deprecated fontSize has been deprecated. Maybe **everest or kilimanjaroDesktop** textStyle instead */
  peta: "32px",
  /** @deprecated fontSize has been deprecated. Maybe **everestDesktop** textStyle instead */
  exa: "54px",
} as const;

export const _mobileFontSize_ = {
  mauna: 44,
  everest: 32,
  kilimanjaro: 24,
  matterhorn: 24,
  vinson: 22,
  blanc: 18,
  fiji: 18,
  rainier: 16,
  boising: 16,
  etna: 14,
  nevis: 14,
  snowdon: 12,
} as const;

export const _desktopFontSize_ = {
  maunaDesktop: 54,
  everestDesktop: 44,
  kilimanjaroDesktop: 32,
  matterhornDesktop: 28,
  vinsonDesktop: 24,
  blancDesktop: 20,
  fijiDesktop: 18,
  rainierDesktop: 16,
  boisingDesktop: 16,
  etnaDesktop: 14,
  nevisDesktop: 14,
  snowdonDesktop: 12,
} as const;

// In a separate object since we don't want to expose these non-responsive values
const _textStyleFontSize_ = {
  ..._mobileFontSize_,
  ..._desktopFontSize_,
} as const;

export const textStyleFontSize = addPx(_textStyleFontSize_);

export const lineHeight = {
  default: 1.4,
} as const;

// In a separate object since we don't want to expose these non-responsive values
const _textStyleLineHeight_ = {
  mauna: 44,
  maunaDesktop: 44,
  everest: 32,
  everestDesktop: 44,
  kilimanjaro: 26,
  kilimanjaroDesktop: 34,
  matterhorn: 30,
  matterhornDesktop: 34,
  vinson: 24,
  vinsonDesktop: 28,
  blanc: 22,
  blancDesktop: 24,
  fiji: 26,
  fijiDesktop: 26,
  rainier: 22,
  rainierDesktop: 24,
  etna: 18,
  etnaDesktop: 20,
  snowdon: 20,
  snowdonDesktop: 20,
} as const;

const textStyleLineHeight = addPx(_textStyleLineHeight_);

const fontWeight = {
  normal: 400,
  semiBold: 600,
  bold: 700,
} as const;

const mauna = css`
  font-weight: ${fontWeight.bold};
  font-size: var(--mauna-font-size, ${textStyleFontSize.mauna});
  line-height: var(--mauna-line-height, ${textStyleLineHeight.mauna});
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const everest = css`
  font-weight: ${fontWeight.bold};
  font-size: var(--everest-font-size, ${textStyleFontSize.everest});
  line-height: var(--everest-line-height, ${textStyleLineHeight.everest});
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const kilimanjaro = css`
  font-weight: ${fontWeight.bold};
  font-size: var(--kilimanjaro-font-size, ${textStyleFontSize.kilimanjaro});
  line-height: var(
    --kilimanjaro-line-height,
    ${textStyleLineHeight.kilimanjaro}
  );
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const matterhorn = css`
  font-weight: ${fontWeight.bold};
  font-size: var(--matterhorn-font-size, ${textStyleFontSize.matterhorn});
  line-height: var(--matterhorn-line-height, ${textStyleLineHeight.matterhorn});
  letter-spacing: 0.02em;
`;

const vinson = css`
  font-weight: ${fontWeight.bold};
  font-size: var(--vinson-font-size, ${textStyleFontSize.vinson});
  line-height: var(--vinson-line-height, ${textStyleLineHeight.vinson});
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

const blanc = css`
  font-weight: ${fontWeight.bold};
  font-size: var(--blanc-font-size, ${textStyleFontSize.blanc});
  line-height: var(--blanc-line-height, ${textStyleLineHeight.blanc});
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

const fiji = css`
  font-weight: ${fontWeight.semiBold};
  font-size: var(--fiji-font-size, ${textStyleFontSize.fiji});
  line-height: var(--fiji-line-height, ${textStyleLineHeight.fiji});
  letter-spacing: 0.02em;
`;

const rainierBase = css`
  font-size: var(--rainier-font-size, ${textStyleFontSize.rainier});
  line-height: var(--rainier-line-height, ${textStyleLineHeight.rainier});
  letter-spacing: 0.02em;
`;

const rainier = css`
  ${rainierBase}
  font-weight: ${fontWeight.normal};
`;

const boising = css`
  ${rainierBase}
  font-weight: ${fontWeight.semiBold};
`;

const etnaBase = css`
  font-size: var(--etna-font-size, ${textStyleFontSize.etna});
  line-height: var(--etna-line-height, ${textStyleLineHeight.etna});
  letter-spacing: 0.02em;
`;

const etna = css`
  ${etnaBase}
  font-weight: ${fontWeight.normal};
`;

const nevis = css`
  ${etnaBase}
  font-weight: ${fontWeight.semiBold};
`;

const snowdon = css`
  font-weight: ${fontWeight.semiBold};
  font-size: var(--snowdon-font-size, ${textStyleFontSize.snowdon});
  line-height: var(--snowdon-line-height, ${textStyleLineHeight.snowdon});
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

export const textStyle = {
  mauna,
  everest,
  kilimanjaro,
  matterhorn,
  vinson,
  blanc,
  fiji,
  rainier,
  boising,
  etna,
  nevis,
  snowdon,
} as const;

export const textStyleMobileCustomProperties = css`
  /* font size numeric value, useful for css calc functions */
  --mauna-font-size-number: ${_textStyleFontSize_.mauna};
  --everest-font-size-number: ${_textStyleFontSize_.everest};
  --kilimanjaro-font-size-number: ${_textStyleFontSize_.kilimanjaro};
  --matterhorn-font-size-number: ${_textStyleFontSize_.matterhorn};
  --vinson-font-size-number: ${_textStyleFontSize_.vinson};
  --blanc-font-size-number: ${_textStyleFontSize_.blanc};
  --fiji-font-size-number: ${_textStyleFontSize_.fiji};
  --rainier-font-size-number: ${_textStyleFontSize_.rainier};
  --boising-font-size-number: ${_textStyleFontSize_.rainier};
  --etna-font-size-number: ${_textStyleFontSize_.etna};
  --nevis-font-size-number: ${_textStyleFontSize_.etna};
  --snowdon-font-size-number: ${_textStyleFontSize_.snowdon};

  /* font size with pixel unit */
  --mauna-font-size: ${textStyleFontSize.mauna};
  --everest-font-size: ${textStyleFontSize.everest};
  --kilimanjaro-font-size: ${textStyleFontSize.kilimanjaro};
  --matterhorn-font-size: ${textStyleFontSize.matterhorn};
  --vinson-font-size: ${textStyleFontSize.vinson};
  --blanc-font-size: ${textStyleFontSize.blanc};
  --fiji-font-size: ${textStyleFontSize.fiji};
  --rainier-font-size: ${textStyleFontSize.rainier};
  --boising-font-size: ${textStyleFontSize.rainier};
  --etna-font-size: ${textStyleFontSize.etna};
  --nevis-font-size: ${textStyleFontSize.etna};
  --snowdon-font-size: ${textStyleFontSize.snowdon};

  /* line height  */
  --mauna-line-height: ${textStyleLineHeight.mauna};
  --everest-line-height: ${textStyleLineHeight.everest};
  --kilimanjaro-line-height: ${textStyleLineHeight.kilimanjaro};
  --matterhorn-line-height: ${textStyleLineHeight.matterhorn};
  --vinson-line-height: ${textStyleLineHeight.vinson};
  --blanc-line-height: ${textStyleLineHeight.blanc};
  --fiji-line-height: ${textStyleLineHeight.fiji};
  --rainier-line-height: ${textStyleLineHeight.rainier};
  --boising-line-height: ${textStyleLineHeight.rainier};
  --etna-line-height: ${textStyleLineHeight.etna};
  --nevis-line-height: ${textStyleLineHeight.etna};
  --snowdon-line-height: ${textStyleLineHeight.snowdon};
`;

export const textStyleDesktopCustomProperties = css`
  /* font size numeric value, useful for css calc functions */
  --mauna-font-size-number: ${_textStyleFontSize_.maunaDesktop};
  --everest-font-size-number: ${_textStyleFontSize_.everestDesktop};
  --kilimanjaro-font-size-number: ${_textStyleFontSize_.kilimanjaroDesktop};
  --matterhorn-font-size-number: ${_textStyleFontSize_.matterhornDesktop};
  --vinson-font-size-number: ${_textStyleFontSize_.vinsonDesktop};
  --blanc-font-size-number: ${_textStyleFontSize_.blancDesktop};
  --fiji-font-size-number: ${_textStyleFontSize_.fijiDesktop};
  --rainier-font-size-number: ${_textStyleFontSize_.rainierDesktop};
  --boising-font-size-number: ${_textStyleFontSize_.rainierDesktop};
  --etna-font-size-number: ${_textStyleFontSize_.etnaDesktop};
  --nevis-font-size-number: ${_textStyleFontSize_.etnaDesktop};
  --snowdon-font-size-number: ${_textStyleFontSize_.snowdonDesktop};

  /* font size with pixel unit */
  --mauna-font-size: ${textStyleFontSize.maunaDesktop};
  --everest-font-size: ${textStyleFontSize.everestDesktop};
  --kilimanjaro-font-size: ${textStyleFontSize.kilimanjaroDesktop};
  --matterhorn-font-size: ${textStyleFontSize.matterhornDesktop};
  --vinson-font-size: ${textStyleFontSize.vinsonDesktop};
  --blanc-font-size: ${textStyleFontSize.blancDesktop};
  --fiji-font-size: ${textStyleFontSize.fijiDesktop};
  --rainier-font-size: ${textStyleFontSize.rainierDesktop};
  --boising-font-size: ${textStyleFontSize.rainierDesktop};
  --etna-font-size: ${textStyleFontSize.etnaDesktop};
  --nevis-font-size: ${textStyleFontSize.etnaDesktop};
  --snowdon-font-size: ${textStyleFontSize.snowdonDesktop};

  /* line height  */
  --mauna-line-height: ${textStyleLineHeight.mauna};
  --everest-line-height: ${textStyleLineHeight.everestDesktop};
  --kilimanjaro-line-height: ${textStyleLineHeight.kilimanjaroDesktop};
  --matterhorn-line-height: ${textStyleLineHeight.matterhornDesktop};
  --vinson-line-height: ${textStyleLineHeight.vinsonDesktop};
  --blanc-line-height: ${textStyleLineHeight.blancDesktop};
  --fiji-line-height: ${textStyleLineHeight.fijiDesktop};
  --rainier-line-height: ${textStyleLineHeight.rainierDesktop};
  --boising-line-height: ${textStyleLineHeight.rainierDesktop};
  --etna-line-height: ${textStyleLineHeight.etnaDesktop};
  --nevis-line-height: ${textStyleLineHeight.etnaDesktop};
  --snowdon-line-height: ${textStyleLineHeight.snowdonDesktop};
`;
