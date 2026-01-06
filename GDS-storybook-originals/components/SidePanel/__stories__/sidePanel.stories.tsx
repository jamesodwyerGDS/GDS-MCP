import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import { useArgs, useState } from "storybook/preview-api";
import styled from "styled-components";

import SidePanel from "../SidePanel";
import Button from "../../Button";

type ComponentPropsAndCustomArgs = React.ComponentProps<typeof SidePanel> & {
  /**
   * Custom story args
   */
  showSubtitle?: boolean;
};

const meta: Meta<ComponentPropsAndCustomArgs> = {
  component: SidePanel,
  title: "Components/SidePanel",
  args: {
    mobileMaxViewportWidth: "600px",
    ariaLabel: "Panel title",
    showOverlay: true,
  },
  argTypes: {
    showSubtitle: {
      control: { type: "boolean" },
      description:
        "Custom story arg to show and hide header subtitle, not a SidePanel prop.",
      defaultValue: false,
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Ensure that you always use SidePanel.Title and SidePanel.Description to properly label the Panel for accessibility reasons.
 */
export const Standard: Story = {
  args: {
    showSubtitle: true,
  },
  render: function Render({ showSubtitle, ...args }) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <>
        <Button onClick={handleOpen}>Open Side Panel</Button>
        <SidePanel {...args} onClose={handleClose}>
          <SidePanel.Header
            closeButtonLabel="close panel"
            backButtonLabel="close panel"
          >
            <SidePanel.Title>Side Panel Title</SidePanel.Title>
            {showSubtitle && <SidePanel.Subtitle>Subtitle</SidePanel.Subtitle>}
          </SidePanel.Header>
          <SidePanel.Content>
            <SidePanel.Description>Side Panel body copy</SidePanel.Description>
          </SidePanel.Content>
          <SidePanel.Footer>
            <Button fullWidth onClick={handleClose}>
              Primary
            </Button>
          </SidePanel.Footer>
        </SidePanel>
      </>
    );
  },
};

export const LeftPlacement: Story = {
  args: {
    placement: "start",
  },
  render: function Render({ showSubtitle, ...args }) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <>
        <Button onClick={handleOpen}>Open Side Panel</Button>
        <SidePanel {...args} onClose={handleClose}>
          <SidePanel.Header closeButtonLabel="close panel">
            <SidePanel.Title>Side Panel Title</SidePanel.Title>
            {showSubtitle && <SidePanel.Subtitle>Subtitle</SidePanel.Subtitle>}
          </SidePanel.Header>
          <SidePanel.Content>
            <SidePanel.Description>Side Panel body copy.</SidePanel.Description>
          </SidePanel.Content>
          <SidePanel.Footer>
            <Button fullWidth onClick={handleClose}>
              Primary
            </Button>
          </SidePanel.Footer>
        </SidePanel>
      </>
    );
  },
};

/**
 * The scrollable TopWideContainer
 */
export const WithTopWideContainerScrollable: Story = {
  args: {
    placement: "start",
  },
  render: function Render({ showSubtitle, ...args }) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <>
        <Button onClick={handleOpen}>Open Side Panel</Button>
        <SidePanel {...args} onClose={handleClose}>
          <SidePanel.Header closeButtonLabel="close panel">
            <SidePanel.Title>Side Panel Title</SidePanel.Title>
            {showSubtitle && <SidePanel.Subtitle>Subtitle</SidePanel.Subtitle>}
          </SidePanel.Header>
          <SidePanel.Content>
            <StyledTopWideContainer>
              <p>Top Wide Container</p>
            </StyledTopWideContainer>
            <SidePanel.Description>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
              dicta officiis id ex? Sequi ratione unde fugit dolorum ex,
              reiciendis suscipit omnis recusandae neque architecto repellendus
              doloremque quo perferendis voluptatum minus? Aut dolor, quibusdam
              minus, enim sunt optio fuga doloremque ipsum quos velit commodi
              expedita asperiores sapiente quam perspiciatis porro illum
              veritatis tempora? Sunt quos amet nam architecto laudantium
              quibusdam consequuntur odio hic quam eaque inventore repellendus
              quas nobis exercitationem eum cumque, laboriosam fugiat, esse nisi
              recusandae nemo error. Beatae voluptatem perspiciatis nesciunt
              natus, aliquam culpa enim cupiditate mollitia hic. Corporis
              incidunt magni voluptas corrupti at nesciunt assumenda eaque sed
              in quisquam debitis asperiores et nobis illo praesentium
              aspernatur quod veritatis commodi consectetur, veniam dignissimos!
              Labore, tempora culpa. Nulla, aperiam ratione quae quam sequi
              harum ipsum expedita culpa sapiente impedit soluta omnis magnam
              itaque recusandae atque dignissimos ipsa voluptatum,
              exercitationem maxime repellat laborum laboriosam non. Quia, illo
              ipsum. Optio ab deserunt veritatis corrupti soluta voluptatibus
              tempora? Iusto accusantium molestiae magnam doloremque in illum
              debitis ipsa, odit modi asperiores, ad magni animi quisquam nihil.
              Ratione qui a repudiandae cumque quo aliquam, illo quis incidunt.
              Sunt iure omnis eius quaerat nobis laboriosam nostrum, recusandae
              aspernatur dicta maxime est totam praesentium asperiores culpa ex
              non modi, esse, facilis commodi quibusdam consequuntur. Sapiente
              eos at quod impedit accusantium obcaecati animi officiis mollitia
              eius odit laudantium praesentium assumenda reiciendis natus eum,
              ea dolorem quasi autem aperiam dolorum ducimus non error
              repellendus eaque. Dolorem qui quidem laborum veritatis ipsam
              autem, est maiores ad dolor voluptates beatae cupiditate eligendi
              distinctio laudantium assumenda non itaque provident, nesciunt
              repellat molestias impedit obcaecati explicabo id asperiores.
              Voluptatem mollitia itaque quis sapiente neque fugiat error
              tenetur reiciendis a, ipsa deserunt aspernatur sint porro nemo ut
              praesentium corrupti aliquam numquam cum quas sit. Sed recusandae
              voluptate saepe illo explicabo. Voluptas animi commodi rem vel
              distinctio dolor nam quia culpa tenetur! Maiores at minima,
              aspernatur porro deserunt ad provident vero eos odio eum
              distinctio saepe quam accusantium commodi ab enim ducimus officiis
              aperiam. Nihil expedita, quo facilis asperiores laboriosam, itaque
              fugiat dolorem placeat iure excepturi cum minus ex? Exercitationem
              aliquid libero, repellendus culpa eveniet architecto unde ratione,
              dignissimos sequi quo aspernatur in et aut, similique soluta
              consectetur fugiat excepturi? Pariatur aut ipsum cumque inventore
              nisi maiores et sed assumenda, necessitatibus laborum numquam
              accusamus corrupti! Perspiciatis, quos nobis? Cupiditate doloribus
              maxime dolorum laudantium vitae possimus minus porro pariatur
              aspernatur consequuntur, sed incidunt eius officiis tenetur,
              aliquam omnis, voluptates ducimus facilis odio commodi assumenda
              in? Mollitia labore tempore eum maxime explicabo molestias magni
              id obcaecati porro quisquam laboriosam voluptatem facere incidunt
              cumque quaerat perferendis itaque sed expedita iusto
              exercitationem, veniam nihil cupiditate beatae aut. Laborum
              expedita numquam rerum qui vel, consequatur explicabo hic, minus
              impedit quisquam harum est, repellat quae minima corrupti
              asperiores sit placeat eligendi nulla incidunt molestias pariatur
              sint! Obcaecati ab at nobis dolores magni consectetur mollitia
              reprehenderit voluptatibus nihil omnis, et voluptates aspernatur
              eius architecto ut corrupti excepturi qui! Ea pariatur odit eaque,
              aut possimus explicabo maxime vel natus, voluptas molestiae
              tempore!
            </SidePanel.Description>
          </SidePanel.Content>
          <SidePanel.Footer>
            <Button fullWidth onClick={handleClose}>
              Primary
            </Button>
          </SidePanel.Footer>
        </SidePanel>
      </>
    );
  },
};

/**
 * The sticky TopWideContainer
 */
export const WithTopWideContainerSticky: Story = {
  args: {
    placement: "start",
  },
  render: function Render({ showSubtitle, ...args }) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <>
        <Button onClick={handleOpen}>Open Side Panel</Button>
        <SidePanel {...args} onClose={handleClose}>
          <SidePanel.Header closeButtonLabel="close panel">
            <SidePanel.Title>Side Panel Title</SidePanel.Title>
            {showSubtitle && <SidePanel.Subtitle>Subtitle</SidePanel.Subtitle>}
          </SidePanel.Header>
          <SidePanel.Content>
            <StyledTopWideContainer sticky>
              <p>Top Wide Container</p>
            </StyledTopWideContainer>
            <SidePanel.Description>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum at
              quis dicta aut, aliquid repellat ex velit minus saepe reiciendis
              ut provident deleniti delectus reprehenderit iure rem commodi
              libero mollitia? Aspernatur animi reiciendis libero consequuntur,
              dignissimos unde maxime blanditiis! Vel accusamus id quisquam
              temporibus dolore fugit, itaque sequi debitis magnam accusantium
              nostrum eligendi impedit perferendis in nisi. Exercitationem, ex
              itaque deserunt reiciendis mollitia at odit debitis ad non in
              ullam, tempore architecto numquam libero possimus perspiciatis
              nostrum nesciunt placeat obcaecati quis dolore ratione blanditiis
              quidem velit? Quasi nostrum aspernatur facere dolores obcaecati
              alias, fugiat eius aliquam magnam minus ab neque, natus ipsa non
              impedit magni architecto asperiores quos ducimus velit in ipsum.
              Aut, modi animi id quos numquam enim obcaecati nobis qui illum
              reiciendis perferendis est tempora dolor quasi deleniti suscipit
              fugiat dolore labore possimus similique vero natus? Pariatur
              facilis ea aliquid, nulla maxime dolores animi delectus, dolorem
              unde molestiae blanditiis, voluptates ut. Harum voluptatum sequi
              nisi, nostrum sunt asperiores vitae animi officia itaque nobis,
              vero quis aliquid cumque fugiat, ea fuga corporis similique
              dolorum possimus aut. Exercitationem quos maiores aperiam
              molestias numquam, nulla rerum tempora impedit a accusantium quas
              esse officiis est ratione, possimus eligendi neque, eveniet quae
              unde vitae nobis sed fugiat id! Eos alias, neque tempore cum nam
              deserunt magnam, ullam quos mollitia enim vero temporibus vel sunt
              maiores aliquam. Quod veniam omnis velit earum laborum assumenda
              eveniet repudiandae deserunt dolorum odit in nihil, facilis, sed
              soluta, voluptas voluptatibus. Ad tempore aliquam a cumque quo
              quos perspiciatis quaerat quia laudantium dolorum fugit repellat,
              nam magni sint corrupti facilis voluptatibus dolorem nulla
              consequuntur id quisquam eveniet iure non! Placeat assumenda
              numquam quod voluptates architecto nostrum laboriosam id animi
              adipisci vero dolorum eligendi ullam optio voluptatum, itaque
              magnam quidem similique! Ullam officiis voluptate odit beatae quam
              ab quos placeat, illo error? Eveniet vel et error fugit laudantium
              dignissimos itaque, dolorem consectetur, nihil doloribus ea,
              molestias obcaecati consequuntur neque distinctio. Deleniti itaque
              quaerat rem, quis consequuntur sequi iure quibusdam facere vero
              repellendus temporibus cupiditate voluptatum ratione asperiores
              ut! Numquam eos magnam nisi deserunt, error suscipit, nulla quas
              libero adipisci, odio commodi eaque ipsum cupiditate modi
              doloribus ea cum reprehenderit dolorem sed repellat. Eius autem
              dolorem ab. Consectetur minus, atque nemo itaque fugit, nostrum
              aut dicta, repudiandae perferendis enim veritatis laudantium eum?
              Sunt expedita quam unde suscipit eveniet, officiis quae vel,
              delectus quaerat quia earum rerum impedit fugiat in magnam
              veritatis ut, corrupti deserunt ipsum nam quo iure. Deleniti
              laborum voluptatibus minima facilis. Sed explicabo aperiam
              mollitia repudiandae, accusamus praesentium maxime beatae quo
              dolore enim facilis ipsam sint distinctio nemo nam debitis
              adipisci, officia illo cum error! Beatae provident voluptates
              inventore expedita placeat pariatur dolores accusamus explicabo
              necessitatibus illo hic quia neque obcaecati tenetur deleniti
              praesentium dolorum, maiores excepturi incidunt. Nulla, animi.
              Iusto, vero? Atque vel dolorum exercitationem ut neque quidem
              ratione labore eligendi. Ducimus ad nobis error. Culpa rem id
              maiores molestias eius quibusdam cupiditate, facilis numquam
              voluptatum maxime, error recusandae perferendis aspernatur
              voluptates eveniet blanditiis? Porro sed saepe recusandae.
            </SidePanel.Description>
          </SidePanel.Content>
          <SidePanel.Footer>
            <Button fullWidth onClick={handleClose}>
              Primary
            </Button>
          </SidePanel.Footer>
        </SidePanel>
      </>
    );
  },
};

/**
 * The the slide in transition may not work properly if the containing parent is not set to overflow: clip or clip-path: inset(0 0 0 0).
 */
export const Contained: Story = {
  args: {
    isContained: true,
  },
  render: function Render({ showSubtitle, ...args }) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            width: "500px",
            height: "80vh",
            padding: "16px",
            position: "relative",
            overflow: "clip",
          }}
        >
          <Button onClick={handleOpen}>Open Side Panel</Button>
          <SidePanel {...args} onClose={handleClose}>
            <SidePanel.Header backButtonLabel="close panel">
              <SidePanel.Title>Side Panel Title</SidePanel.Title>
              {showSubtitle && (
                <SidePanel.Subtitle>Subtitle</SidePanel.Subtitle>
              )}
            </SidePanel.Header>
            <SidePanel.Content>
              <SidePanel.Description>
                Side Panel body copy.
              </SidePanel.Description>
            </SidePanel.Content>
            <SidePanel.Footer>
              <Button fullWidth onClick={handleClose}>
                Primary
              </Button>
            </SidePanel.Footer>
          </SidePanel>
        </div>
      </div>
    );
  },
};

export const Scrollable: Story = {
  render: function Render({ showSubtitle, ...args }) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <>
        <Button onClick={handleOpen}>Open Side Panel</Button>
        <SidePanel {...args} onClose={handleClose}>
          <SidePanel.Header closeButtonLabel="close panel">
            <SidePanel.Title>Side Panel Title</SidePanel.Title>
          </SidePanel.Header>
          <SidePanel.Content>
            <SidePanel.Description>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              atque voluptates aliquid facere magni fuga quod recusandae officia
              fugit, explicabo, dicta quis cupiditate officiis maiores mollitia
              earum. Totam repellat earum adipisci accusantium atque at
              recusandae cum libero amet reprehenderit perspiciatis, pariatur
              ducimus nam ab suscipit eaque cumque voluptas, eos officiis dolore
              minima molestias. Explicabo rerum natus cupiditate et voluptatibus
              voluptas dicta repellendus reprehenderit non animi! Labore dolores
              tempora autem consectetur est fuga earum expedita tenetur delectus
              natus ex error, non libero debitis possimus itaque commodi odit
              iure aliquam nihil sequi quos quo illum. Debitis vero
              necessitatibus iusto quia fugit illo ducimus vel numquam ea non in
              expedita, tenetur culpa minus, officia aliquid, nemo aperiam
              perspiciatis ut possimus? Quaerat doloremque eos velit quas
              accusamus libero tempore iusto quasi pariatur labore quos
              consectetur sed, facilis delectus, culpa minima? Accusantium enim
              quidem commodi. Fugit assumenda error alias nobis, perspiciatis id
              ut animi a, est dolorem repudiandae, enim ipsam atque laboriosam
              fuga itaque veritatis illum praesentium facilis! Cupiditate,
              dolores eligendi eos adipisci esse ipsa. Odio sed asperiores
              obcaecati accusantium magni soluta pariatur quo consequatur
              expedita temporibus est qui at, aperiam quasi id quaerat vero
              provident consectetur. Impedit, natus? Soluta vitae blanditiis
              adipisci, magnam dolores neque, ea, unde error pariatur minima
              quae commodi? Soluta aliquam, laudantium quia ducimus voluptatem
              pariatur earum tenetur! Blanditiis, dolor nam. Itaque hic sed
              facilis, omnis quasi numquam sint tempora, aut saepe dolore
              perferendis sit vitae provident molestiae fugiat aperiam eum
              necessitatibus accusantium ut soluta. Laboriosam aut maiores
              pariatur omnis repellat in, esse hic ab? Similique libero vel
              doloribus, nemo aperiam nam odio ipsa repellat consectetur?
              Voluptatum expedita itaque ullam ipsum qui. Voluptas animi
              necessitatibus vitae, alias nihil quod officia quo aut quos earum
              obcaecati quaerat maiores impedit est iusto consequatur deleniti
              culpa. Eius, minima ipsum dolores quas expedita ipsam!
              Perspiciatis magni labore esse officia magnam ipsa id, cupiditate
              nisi odit tempora quae ipsam illum, incidunt dolorum voluptatem
              doloribus eum vitae eos eligendi consequatur assumenda
              consequuntur dicta. Animi, harum sed. Quisquam atque quae rem
              voluptatibus perspiciatis obcaecati reprehenderit consectetur
              magni suscipit. Voluptate illo dolor voluptates, inventore
              reiciendis magni illum pariatur unde sed at aspernatur? Et quam
              dicta distinctio quas. Alias fuga qui sunt voluptatibus nobis
              excepturi dolore commodi repellendus aperiam provident
              perspiciatis voluptate placeat fugit quis est omnis harum maxime
              dolorem voluptates, assumenda, fugiat, labore esse. Aperiam culpa
              accusamus necessitatibus ad, repudiandae sit neque, ab autem
              magnam, voluptatibus nulla. Adipisci beatae totam repellendus
              dicta, nemo eveniet sapiente similique ratione accusamus
              laudantium ab nostrum magnam mollitia molestias assumenda at!
              Optio dicta voluptate ab deleniti quas iusto consequatur. Saepe
              eligendi nam voluptatibus nemo delectus esse quia inventore, animi
              et quo numquam, adipisci ducimus consequuntur tempora laborum sed
              molestiae quasi quidem, pariatur facilis excepturi dignissimos.
              Deserunt quam dolorem ipsa, magnam similique modi laudantium et
              vitae perferendis iusto. Voluptatem asperiores aperiam eveniet
              ducimus magni, tempora harum nobis nostrum modi facilis ex
              praesentium delectus omnis nam corporis quos dignissimos culpa
              quae suscipit minus expedita nesciunt ratione voluptatibus sit.
              Veniam ea eum maxime cumque illum repellat quidem!
            </SidePanel.Description>
          </SidePanel.Content>
          <SidePanel.Footer>
            <Button fullWidth onClick={handleClose}>
              Primary
            </Button>
          </SidePanel.Footer>
        </SidePanel>
      </>
    );
  },
};

export const NoFooter: Story = {
  render: function Render({ showSubtitle, ...args }) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <>
        <Button onClick={handleOpen}>Open Side Panel</Button>
        <SidePanel {...args} onClose={handleClose}>
          <SidePanel.Header closeButtonLabel="close panel">
            <SidePanel.Title>Side Panel Title</SidePanel.Title>
            {showSubtitle && <SidePanel.Subtitle>Subtitle</SidePanel.Subtitle>}
          </SidePanel.Header>
          <SidePanel.Content>
            <SidePanel.Description>Side Panel body copy</SidePanel.Description>
          </SidePanel.Content>
        </SidePanel>
      </>
    );
  },
};

/**
 * When using a SidePanel within a SidePanel, set showOverlay to false on the nested panel to prevent multiple overlays.
 */
export const NestedPanels: Story = {
  render: function Render({ showSubtitle, ...args }) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });
    const [nestedPanelOpen, setNestedPanelOpen] = useState(false);

    return (
      <>
        <Button onClick={handleOpen}>Open Side Panel</Button>
        <SidePanel {...args} onClose={handleClose}>
          <SidePanel.Header closeButtonLabel="close panel">
            <SidePanel.Title>Side Panel Title</SidePanel.Title>
            {showSubtitle && <SidePanel.Subtitle>Subtitle</SidePanel.Subtitle>}
          </SidePanel.Header>
          <SidePanel.Content>
            <SidePanel.Description>Side Panel body copy</SidePanel.Description>
            {/* Somewhere down the nodes tree */}
            <SidePanel
              isOpen={nestedPanelOpen}
              onClose={() => setNestedPanelOpen(false)}
              mobileMaxViewportWidth="600px"
              ariaLabel="Nested Panel Title"
              showOverlay={false}
            >
              <SidePanel.Header backButtonLabel="close panel">
                <SidePanel.Title>Nested Panel Title</SidePanel.Title>
                {showSubtitle && (
                  <SidePanel.Subtitle>Subtitle</SidePanel.Subtitle>
                )}
              </SidePanel.Header>
              <SidePanel.Content>
                <SidePanel.Description>
                  Nested Side Panel body copy
                </SidePanel.Description>
              </SidePanel.Content>
              <SidePanel.Footer>
                <Button fullWidth>Primary</Button>
              </SidePanel.Footer>
            </SidePanel>
          </SidePanel.Content>
          <SidePanel.Footer>
            <Button fullWidth onClick={() => setNestedPanelOpen(true)}>
              Open Nested Side Panel
            </Button>
          </SidePanel.Footer>
        </SidePanel>
      </>
    );
  },
};

export const RTL = {
  ...Standard,
  globals: {
    addonRtl: "rtl",
  },
};

const StyledTopWideContainer = styled(SidePanel.TopWideContainer)`
  color: white;
  background-color: black;
`;
