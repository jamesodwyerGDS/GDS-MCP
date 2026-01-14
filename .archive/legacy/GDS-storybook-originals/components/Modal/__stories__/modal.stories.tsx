import React from "react";
import { Meta, StoryObj } from "@storybook/react-webpack5";
import { useArgs } from "storybook/preview-api";

import Modal from "../Modal";
import Button from "../../Button";

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: "Components/Modal",
  args: {
    mobileMaxViewportWidth: "600px",
    ariaLabel: "Modal title",
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Standard: Story = {
  render: function Render(args) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal {...args} onClose={handleClose}>
          <Modal.CloseButton label="close modal" />
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Modal body copy. This should provide detail and clarity to the
              issue and provide clear next steps for the user to take.
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button>Primary</Button>
            <Button colorVariant="secondary">Secondary</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    role: "alertdialog",
  },
  render: function Render(args) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => {
      updateArgs({ isOpen: true });
    };
    const handleClose = () => updateArgs({ isOpen: false });
    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal {...args} onClose={handleClose}>
          <Modal.CloseButton label="close modal" />
          <Modal.Header>
            <Modal.Title>Do You Want to Cancel Your Order?</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Modal body copy. This should provide detail and clarity to the
              issue and provide clear next steps for the user to take.
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button>Primary</Button>
            <Button colorVariant="secondary">Secondary</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    role: "alertdialog",
  },
  render: function Render(args) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal {...args} onClose={handleClose}>
          <Modal.CloseButton label="close modal" />
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Modal body copy. This should provide detail and clarity to the
              issue and provide clear next steps for the user to take.
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button>Primary</Button>
            <Button colorVariant="secondary">Secondary</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  },
};

export const Loading: Story = {
  args: {
    role: "alertdialog",
  },
  render: function Render(args) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal {...args} onClose={() => null}>
          <Modal.CloseButton label="close modal" disabled />
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Modal body copy. This should provide detail and clarity to the
              issue and provide clear next steps for the user to take.
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              loading={{
                isLoading: true,
                hiddenLoadingMessage: "loading the form",
              }}
            >
              Primary
            </Button>
            <Button colorVariant="secondary" disabled>
              Secondary
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  },
};

/**
 * Since the 16:9 image takes up a lot of space, avoid long descriptions to prevent vertical scrolling.
 * The modal must have `hasImage` prop
 */
export const WithImage: Story = {
  args: {
    hasImage: true,
  },
  render: function Render(args) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });
    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal {...args} onClose={handleClose}>
          <Modal.CloseButton label="close modal" />
          <Modal.Image
            alt="bird"
            src="https://images.unsplash.com/photo-1490718687940-0ecadf414600?q=80&h=600px"
          />
          <Modal.Header>
            <Modal.Title>Puffins</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Puffins are known to pair up with the same mate year after year,
              often returning to the same nesting site to raise their chicks
              together.
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium, optio? Impedit facilis cupiditate consequuntur culpa
              rerum doloremque illo? Est tempore obcaecati illum quam nostrum
              molestias itaque deserunt facere reiciendis nemo. Possimus, veniam
              magni! Ea possimus alias corporis earum temporibus ut quam! Vero
              nisi asperiores sit nesciunt cum alias eligendi nihil eveniet unde
              corrupti doloribus quia ut, a maiores consequuntur deleniti. Alias
              error officia est nostrum nobis dicta quibusdam minus iste,
              deleniti labore itaque voluptatibus. Veritatis voluptatibus
              eligendi aliquid reiciendis velit nisi id, magni doloribus, minus
              praesentium aperiam autem commodi perferendis. Natus dicta nemo
              suscipit quos voluptatum atque obcaecati repellendus minima modi
              quam? Aspernatur libero accusantium sunt saepe cum. Consequuntur
              perferendis architecto temporibus quod sapiente cupiditate sequi
              eius, tempore vitae iusto. Reiciendis ad in nisi dolorum dolor
              culpa, deserunt nesciunt molestiae ipsam labore aliquam veritatis
              incidunt, consectetur facere nostrum molestias consequatur
              corporis? Delectus, doloremque! Dolore asperiores assumenda nulla
              amet ipsa ad. Laborum, suscipit? Vero, neque. Consequatur, nam
              alias dolore asperiores reiciendis, odit debitis voluptatibus
              quisquam quam natus quo laudantium corrupti ut eaque deserunt
              magni quidem perferendis esse vel illum unde dolorem! Fugit
              tempore consequatur odit error quibusdam rem, dolores ut sapiente
              distinctio mollitia animi doloribus voluptas in dolorum adipisci
              alias quis! Enim totam quasi aliquid inventore odio sed voluptatem
              architecto obcaecati! Repellat architecto totam voluptates iure
              est, reprehenderit molestiae dolores dolorem quo voluptatum rerum
              expedita eos quas laudantium quidem ab suscipit, similique
              incidunt quaerat quod aspernatur harum eligendi. Neque, vero quod!
              Sunt adipisci dolores nulla earum similique cumque id, voluptas
              perspiciatis est. Officiis, natus quisquam non corporis illum hic
              reprehenderit recusandae aperiam, quo cupiditate, tenetur saepe
              deserunt ducimus aliquid voluptatem consequuntur. Nisi obcaecati
              delectus id reprehenderit nesciunt quas nihil eveniet officiis
              facilis illum dolore nam magni ipsam voluptates, veniam temporibus
              beatae tenetur aspernatur commodi quasi incidunt cumque aliquid
              repellat? Fugit, esse. Eum sequi assumenda animi officia nesciunt
              ullam deserunt beatae ex sit corporis quisquam voluptas doloribus,
              itaque aspernatur perferendis non amet quos deleniti enim id
              exercitationem maiores. Quidem necessitatibus quae tempora! Minima
              ratione excepturi quibusdam, beatae sed quae, libero ducimus et
              incidunt aperiam facere voluptates, aliquid ipsum totam.
              Exercitationem voluptates placeat voluptatem fugit fugiat saepe
              nulla esse harum consectetur. Sed, corrupti. Velit, qui
              consectetur. Tenetur praesentium nisi vero consequuntur hic autem
              non corrupti quae eveniet architecto. Tempora itaque ullam
              accusamus esse dolores rem, officiis labore sapiente expedita
              dolorum temporibus magnam amet. Vitae vero omnis quod unde
              nesciunt labore necessitatibus architecto eaque aspernatur non
              reiciendis dolores dolor nihil eveniet voluptatem, tenetur, magnam
              corporis qui repellendus assumenda sunt. Repellat explicabo velit
              maiores mollitia! Nesciunt eum repellat deserunt vero blanditiis
              numquam molestias, autem ea quia error in culpa perspiciatis
              magnam officiis alias! Eum exercitationem nostrum molestias, cum
              voluptatibus odit sequi animi accusamus unde doloremque. Rerum,
              minima quas. Distinctio esse odio consectetur assumenda nesciunt
              officia similique reprehenderit quae commodi minus. Impedit nihil
              sequi a, magnam labore, excepturi, cupiditate dolorem cumque
              incidunt quisquam porro molestiae inventore. Quos omnis pariatur
              nisi, molestiae, id velit dolores iusto nobis cum corrupti
              eligendi maxime modi quae impedit nihil dignissimos placeat
              similique, ea facere molestias minus. Aliquid eaque delectus
              veniam quod? Neque, iste obcaecati quaerat dolorem nam nulla
              rerum. Iste, nostrum aperiam quam ut iure sapiente architecto
              perspiciatis neque, nam vel consequatur quo totam animi fuga
              dolores hic quia iusto voluptatibus? Quis facere impedit
              consequuntur vero! Cumque perferendis odit dolore magnam
              consequuntur nobis, commodi distinctio doloremque, iste amet animi
              ipsam quia fugiat eius officia inventore incidunt! Neque suscipit
              saepe laborum quaerat. Excepturi nihil accusamus minus corporis
              quas alias, eaque velit eveniet, unde commodi facilis mollitia?
              Molestiae, nisi harum nostrum, quia quo hic asperiores
              consequuntur iusto, libero sit autem illum veniam itaque.
              Accusamus ipsum nulla maiores. Fugiat at nesciunt laudantium
              laboriosam veritatis, ad quaerat autem, ea, eveniet non eius cum
              temporibus. Impedit asperiores similique cupiditate? Reprehenderit
              quas nam sapiente eos, esse exercitationem. Eaque minima quam
              obcaecati numquam eius. Dolorem quos natus tempore distinctio quas
              minima incidunt provident deleniti aut voluptatum in delectus
              totam rem, rerum architecto reprehenderit alias nobis similique
              tenetur a? Iure quaerat optio adipisci modi aspernatur unde
              voluptates quam libero, similique ab nobis veritatis voluptas
              maxime placeat temporibus architecto suscipit hic voluptatibus.
              Cumque exercitationem sequi consectetur in architecto dolorum
              numquam. Maiores esse iure nesciunt vitae consequuntur aliquam
              suscipit atque molestiae ratione odit error minima tempora sit ab
              vel, ipsum non dolorem possimus accusantium cum dolores quia
              repellat iusto. Esse, minima! Laudantium vitae, quidem nisi minus
              veniam doloremque voluptas ducimus impedit deleniti reprehenderit
              voluptatibus molestiae alias, nihil numquam natus totam cupiditate
              necessitatibus eos corporis! Beatae sequi, impedit esse sit
              perspiciatis eum? Necessitatibus est blanditiis debitis nisi iste
              maxime, eum doloribus rem iusto modi veniam dignissimos magni,
              repellat aliquam odio sint. Illum alias beatae nisi hic fugiat
              voluptatum nihil, doloribus magni delectus. Vitae, aliquam eaque?
              Soluta accusamus recusandae, iusto veritatis ratione fugit ad
              ipsum nihil minus debitis similique quasi expedita error magni
              pariatur earum quidem dolores odio necessitatibus rem eum nisi?
              Rerum. Sapiente fugiat hic atque veniam error architecto animi
              placeat culpa in totam numquam esse perferendis adipisci aliquid
              dignissimos similique quia, repudiandae facilis laudantium non
              necessitatibus magnam mollitia excepturi facere. Ipsum! Officia
              recusandae pariatur similique eos veritatis earum optio quibusdam
              voluptatum officiis sint porro magni consectetur nulla ratione,
              molestiae sit commodi quos id quae a! Optio sunt magnam voluptatem
              quae voluptates? Libero, debitis sapiente aspernatur atque odit
              deserunt quas eaque corrupti ipsam officia, harum excepturi
              ducimus alias. Dolorem laboriosam iusto eligendi molestias tempore
              similique, totam, placeat reprehenderit aliquid, aut voluptate ad!
              Saepe sit consequuntur, illum ex quae doloribus. Saepe beatae
              eveniet fugit ipsum, repellat magnam fugiat. Exercitationem nam
              accusamus nihil a dolor nisi illo? Nisi voluptatem reiciendis
              repellendus consectetur, possimus vitae! Eligendi laudantium
              deleniti consectetur, magnam reiciendis ipsam sint, delectus nisi
              voluptates quibusdam optio omnis aperiam libero molestiae in
              repellendus eos qui! Perferendis unde repellat assumenda veniam
              possimus porro fugiat dolor! Laborum soluta obcaecati ducimus
              porro saepe dignissimos vel commodi nulla, odio rerum in et quasi
              amet hic vitae dolore nihil atque modi praesentium quibusdam
              debitis voluptas possimus veritatis. Consectetur, voluptatum!
              Consectetur, consequatur! Facere magnam repellendus modi nihil
              velit temporibus? Illo repellat unde tempora ipsam, officia culpa
              rerum nihil inventore quae totam, omnis molestiae, voluptatum
              commodi enim! Tempore recusandae voluptatem amet. Exercitationem
              dolorum, cupiditate rerum harum aperiam facilis minima rem
              aspernatur! Quo quaerat facere modi labore iusto eum debitis rerum
              quia deleniti. Inventore, aut! Illum perferendis, aperiam ratione
              nostrum cumque asperiores! Amet assumenda atque nihil aut repellat
              voluptas esse est quasi similique fuga dolorem laboriosam
              provident sit error repellendus accusantium quis officiis vitae
              et, pariatur accusamus perspiciatis animi, tempore facilis? Velit.
              Voluptate perspiciatis id at aliquid assumenda, sequi maxime, ex
              nulla ipsam consequatur quis earum, aspernatur incidunt unde
              laborum commodi enim cumque suscipit vero velit alias officiis
              similique totam? Eveniet, consequatur. Error perspiciatis neque
              cupiditate nesciunt delectus mollitia quis blanditiis quae eaque
              ex nulla accusantium quam quibusdam, est dignissimos repudiandae
              repellendus laboriosam placeat quas odio corporis quisquam quasi
              nostrum inventore. Esse. Ab nostrum aut sequi quis numquam vero
              blanditiis nemo, aliquid fugit qui esse assumenda praesentium
              incidunt, ad animi. Maiores aspernatur eveniet iusto culpa
              eligendi explicabo inventore saepe excepturi modi! Obcaecati.
              Perferendis, explicabo at qui aspernatur numquam blanditiis minus
              id non tempora illo totam. Dignissimos tempora debitis quo dicta
              illum veniam cumque quidem minus est dolorem ut magni, obcaecati
              animi minima?
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions>
            <Button>Primary</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  },
};

/**
 * An example of how to create a non-closable modal
 */
export const NotCloseable: Story = {
  render: function Render(args) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => null;

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal {...args} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Modal Title </Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Modal body copy. This should provide detail and clarity to the
              issue and provide clear next steps for the user to take.
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button>Primary</Button>
            <Button colorVariant="secondary">Secondary</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  },
};

/**
 * Auto scroll activates when the content exceeds the max height.
 */
export const Scrollable: Story = {
  render: function Render(args) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal {...args} onClose={handleClose}>
          <Modal.CloseButton label="close modal" />
          <Modal.Header>
            <Modal.Title>This sale is for invited fans</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              The account you are using is not linked to this invitation only
              sale. To continue, please switch accounts and sign in with the
              same account that you received your sale notification. Didn’t
              receive an invite to this sale? Please check back for more
              updates.Didn’t receive an invite to this sale? Please check back
              for more updates. Didn’t receive an invite to this sale? Please
              check back for more updates.Didn’t receive an invite to this sale?
              Please check back for more updates. The account you are using is
              not linked to this invitation only sale. To continue, please
              switch accounts and sign in with the same account that you
              received your sale notification. Didn’t receive an invite to this
              sale? Please check back for more updates.Didn’t receive an invite
              to this sale? Please check back for more updates. Didn’t receive
              an invite to this sale? Please check back for more updates.Didn’t
              receive an invite to this sale? Please check back for more
              updates. The account you are using is not linked to this
              invitation only sale. To continue, please switch accounts and sign
              in with the same account that you received your sale notification.
              Didn’t receive an invite to this sale? Please check back for more
              updates.Didn’t receive an invite to this sale? Please check back
              for more updates. Didn’t receive an invite to this sale? Please
              check back for more updates.Didn’t receive an invite to this sale?
              Please check back for more updates. The account you are using is
              not linked to this invitation only sale. To continue, please
              switch accounts and sign in with the same account that you
              received your sale notification. Didn’t receive an invite to this
              sale? Please check back for more updates.Didn’t receive an invite
              to this sale? Please check back for more updates. Didn’t receive
              an invite to this sale? Please check back for more updates.Didn’t
              receive an invite to this sale? Please check back for more
              updates.
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button>Primary</Button>
            <Button colorVariant="secondary">Secondary</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  },
};

/**
 * By default, the Modal auto-focuses the first tabbable element inside the dialog. To set a specific action as the default focus, use the data-autofocus attribute.
 */
export const WithCustomAutoFocus: Story = {
  render: function Render(args) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal {...args} onClose={handleClose}>
          <Modal.CloseButton label="close modal" />
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Modal body copy. This should provide detail and clarity to the
              issue and provide clear next steps for the user to take.
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button data-autofocus>Primary</Button>
            <Button colorVariant="secondary">Secondary</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  },
};
/**
 * An example of no footer actions
 */
export const WithNoFooterActions: Story = {
  render: function Render(args) {
    const [_, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal {...args} onClose={handleClose}>
          <Modal.CloseButton label="close modal" />
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              Modal body copy. This should provide detail and clarity to the
              issue and provide clear next steps for the user to take.
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};
