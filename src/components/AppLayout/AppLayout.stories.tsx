import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AppLayout from './AppLayout';

const meta: Meta<typeof AppLayout> = {
  title: 'components/AppLayout',
  component: AppLayout,
};

export default meta;

type Story = StoryObj<typeof AppLayout>;

export const AppLayoutStory: Story = {
  render: () => (
    <>
      <AppLayout>
        <div>
          <p>
            Добавляем немного контента, чтобы можно было проверить прилипание верхнего меню при выполнении прокрутки
            страницы...
          </p>
          <p>***</p>
          <p>
            В лукоморье дуб зеленый;
            <br />
            Златая цепь на дубе том:
            <br />
            И днем и ночью кот ученый
            <br />
            Все ходит по цепи кругом;
            <br />
            Идет направо — песнь заводит,
            <br />
            Налево — сказку говорит.
            <br />
            Там чудеса: там леший бродит,
            <br />
            Русалка на ветвях сидит;
            <br />
            Там на неведомых дорожках
            <br />
            Следы невиданных зверей;
            <br />
            Избушка там на курьих ножках
            <br />
            Стоит без окон, без дверей;
            <br />
            Там лес и дол видений полны;
            <br />
            Там о заре прихлынут волны
            <br />
            На брег песчаный и пустой,
            <br />
            И тридцать витязей прекрасных
            <br />
            Чредой из вод выходят ясных,
            <br />
            И с ними дядька их морской;
            <br />
            Там королевич мимоходом
            <br />
            Пленяет грозного царя;
            <br />
            Там в облаках перед народом
            <br />
            Через леса, через моря
            <br />
            Колдун несет богатыря;
            <br />
            В темнице там царевна тужит,
            <br />
            А бурый волк ей верно служит;
            <br />
            Там ступа с Бабою Ягой
            <br />
            Идет, бредет сама собой;
            <br />
            Там царь Кащей над златом чахнет;
            <br />
            Там русский дух... там Русью пахнет!
            <br />
            И там я был, и мед я пил;
            <br />
            У моря видел дуб зеленый;
            <br />
            Под ним сидел, и кот ученый
            <br />
            Свои мне сказки говорил.
          </p>

          <p>***</p>

          <p>
            Переправа, переправа,
            <br />
            Берег левый, берег правый,
            <br />
            Снег шершавый, кромка льда,
            <br />
            Кому память, кому слава,
            <br />
            Кому темная вода,
            <br />
            Ни приметы, ни следа.
            <br />
            <br />
            Ночью, первым из колонны,
            <br />
            Обломав у края лед,
            <br />
            Погрузился на понтоны
            <br />
            Первый взвод.
            <br />
            <br />
            Погрузился, оттолкнулся
            <br />
            И пошел, второй за ним.
            <br />
            Приготовился, пригнулся,
            <br />
            Третий следом за вторым.
            <br />
            <br />
            Бой идет святой и правый.
            <br />
            Смертный бой не ради славы,
            <br />
            Ради жизни на земле.
            <br />
            <br />
            На войне, как на войне,
            <br />
            По дорогам и по снегу,
            <br />
            Шел на запад Теркин с боем,
            <br />
            Шел с винтовкою в руке.
            <br />
            <br />
            И хоть голоден, хоть бос,
            <br />
            Не терял солдатский пыл,
            <br />
            Дал ответ на каждый вопрос,
            <br />
            Все по-свойски разъяснил.
            <br />
            <br />
            Переправа, переправа!
            <br />
            В ночь глухую, в снег летящий,
            <br />
            За чертой обрыва страшной,
            <br />
            На одном дыханье став.
            <br />
            <br />
            Понтоны все к тем берегам
            <br />
            Сошли, врага вручили нам.
          </p>
        </div>
      </AppLayout>
    </>
  ),
};
