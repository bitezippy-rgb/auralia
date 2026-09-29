import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wine, Info, Utensils, X, Check, Heart } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types/index.ts';

const MENU_DATA: MenuItem[] = [
  // STARTERS
  {
    id: 's1',
    name: 'Glacial Hamachi & Finger Lime',
    category: 'starters',
    description: 'Crudo of wild Hiramasa, fermented sea buckthorn pearl, compressed winter melon, and foraged sea fennel emulsion.',
    price: 36,
    highlight: 'Signature Cold Dish',
    pairing: 'Domaine Leflaive Puligny-Montrachet 2020',
    dietary: ['Gluten-Free', 'Raw Marine'],
    calories: '220 kcal',
  },
  {
    id: 's2',
    name: 'Smoked Périgord Truffle & Quail Egg',
    category: 'starters',
    description: 'Crisp buckwheat tuile, 63°C soft-poached quail yolk, shaved black winter truffle, and aged Gruyère fondue froth.',
    price: 42,
    highlight: 'Guest Favorite',
    pairing: 'Pierre Gimonnet Blanc de Blancs Extra Brut',
    dietary: ['Vegetarian Option'],
    calories: '310 kcal',
  },
  {
    id: 's3',
    name: 'Charred Hokkaido Scallop Tartare',
    category: 'starters',
    description: 'Flash-seared divergence, smoked bone marrow brioche crisp, oscietra sturgeon caviar, and yuzu kosho gelée.',
    price: 48,
    highlight: 'Imperial Reserve',
    pairing: 'Kistler Les Noisetiers Chardonnay 2021',
    dietary: ['Shellfish', 'Caviar'],
    calories: '280 kcal',
  },

  // MAINS
  {
    id: 'm1',
    name: 'A5 Miyazaki Wagyu Tenderloin',
    category: 'mains',
    description: 'Wood-fired over white binchotan charcoal, black garlic glaze, chanterelle tartlet, and 30-year balsamic reduction.',
    price: 98,
    highlight: 'Chef Special Reserve',
    pairing: 'Château Pichon Longueville Comtesse de Lalande 2015',
    dietary: ['Dairy-Free Optional'],
    calories: '540 kcal',
  },
  {
    id: 'm2',
    name: 'Brittany Blue Lobster & Saffron Bisque',
    category: 'mains',
    description: 'Butter-poached tail, claw ballotine in savoy cabbage, sunchoke mousseline, and langoustine cardamom foam.',
    price: 88,
    highlight: 'Coastal Heritage',
    pairing: 'Meursault Premier Cru Les Charmes 2019',
    dietary: ['Shellfish'],
    calories: '490 kcal',
  },
  {
    id: 'm3',
    name: 'Dry-Aged Squab in Salt-Crust Ash',
    category: 'mains',
    description: 'Breton squab breast stuffed with morels, beet reduction, fermented blackberry jus, and smoked parsnip mille-feuille.',
    price: 76,
    highlight: 'Ancestral Technique',
    pairing: 'Domaine Dujac Morey-Saint-Denis 2018',
    dietary: ['Wild Game'],
    calories: '460 kcal',
  },
  {
    id: 'm4',
    name: 'Wild Maitake & Black Rice Koji Risotto',
    category: 'mains',
    description: 'Slow-simmered heritage carnaroli, charcoal-seared forest maitake, smoked pine oil, and crispy sourdough yeast flakes.',
    price: 64,
    highlight: 'Plant-Forward',
    pairing: 'Barolo Cascina Francia Giacomo Conterno 2017',
    dietary: ['Vegan', 'Gluten-Free'],
    calories: '380 kcal',
  },

  // DESSERTS
  {
    id: 'd1',
    name: 'Cacao Geode & Smoked Madagascar Vanilla',
    category: 'desserts',
    description: '70% Guanaja single-origin chocolate shell, crystalline sugar geode, gold luster dust, passionfruit foam, and warm cacao nib broth.',
    price: 28,
    highlight: 'Kinetic Presentation',
    pairing: 'Château d’Yquem Sauternes 2016',
    dietary: ['Vegetarian'],
    calories: '340 kcal',
  },
  {
    id: 'd2',
    name: 'Cereal Milk Panna Cotta & Shiso Sorbet',
    category: 'desserts',
    description: 'Silken infused organic milk custard, frosted wild blackberries, shiso granita, and honey-roasted buckwheat crunch.',
    price: 24,
    highlight: 'Refreshing Finale',
    pairing: 'Moscato d’Asti Vietti Cascinetta 2022',
    dietary: ['Nut-Free'],
    calories: '260 kcal',
  },

  // DRINKS
  {
    id: 'b1',
    name: 'Aurelia Solstice Smoked Old Fashioned',
    category: 'drinks',
    description: 'Japanese single malt whisky, toasted cedar smoke, house charred orange bitters, and hand-carved ice sphere with edible gold.',
    price: 32,
    highlight: 'Mixology Signature',
    pairing: 'Ideal with A5 Wagyu or Dark Cacao',
    dietary: ['Artisanal Alcohol'],
    calories: '180 kcal',
  },
  {
    id: 'b2',
    name: 'Botanical Clarified Milk Punch',
    category: 'drinks',
    description: 'London dry botanical gin, Earl Grey bergamot tea, pineapple cordial, clarified through sweet whey, lemon verbena essence.',
    price: 26,
    highlight: 'Low-Proof Elegance',
    pairing: 'Ideal with Hiramasa Crudo',
    dietary: ['Dairy Clarified'],
    calories: '140 kcal',
  },
  {
    id: 'b3',
    name: 'Zenith Non-Alcoholic Elixir (Zero Proof)',
    category: 'drinks',
    description: 'Distilled alpine juniper, foraged pine needle hydrolat, bitter gentian root, sparkling wild verjus, and rosemary smoke.',
    price: 22,
    highlight: 'Zero Proof Craft',
    pairing: 'Palate Cleanser & Digestion',
    dietary: ['Alcohol-Free', 'Vegan'],
    calories: '45 kcal',
  },
];

export default function DynamicMenu() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return MENU_DATA;
    return MENU_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const categories: { label: string; value: MenuCategory; count: number }[] = [
    { label: 'All Offerings', value: 'all', count: MENU_DATA.length },
    { label: 'Starters', value: 'starters', count: MENU_DATA.filter((i) => i.category === 'starters').length },
    { label: 'Mains', value: 'mains', count: MENU_DATA.filter((i) => i.category === 'mains').length },
    { label: 'Desserts', value: 'desserts', count: MENU_DATA.filter((i) => i.category === 'desserts').length },
    { label: 'Elixirs & Wines', value: 'drinks', count: MENU_DATA.filter((i) => i.category === 'drinks').length },
  ];

  const toggleSaveItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="menu" className="py-28 relative bg-[#08080a] border-t border-white/5">
      {/* Ambient background blur */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400/90 font-medium">
            <Utensils className="w-3.5 h-3.5" />
            <span>Seasonal Degustation & À La Carte</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-wide text-balance">
            The Autumn Reverie Menu
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Every dish reflects seasonal astronomical alignments and biodynamic foraged harvests from our coastal purveyors.
          </p>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center justify-center mb-14">
          <div className="inline-flex p-1.5 rounded-full bg-stone-900/80 border border-white/10 backdrop-blur-md overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`relative px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-semibold shadow-md'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-1.5 text-[10px] tabular-nums ${isActive ? 'text-stone-900/80' : 'text-stone-500'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => {
              const isSaved = savedItems.includes(item.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  key={item.id}
                  onClick={() => setActiveItemModal(item)}
                  className="group relative rounded-2xl glass-card p-6 sm:p-8 cursor-pointer glass-card-hover flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Title, Highlight & Price */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-xl sm:text-2xl text-white font-medium group-hover:text-amber-300 transition-colors">
                            {item.name}
                          </h3>
                        </div>
                        {item.highlight && (
                          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-amber-400/90 font-medium">
                            <Sparkles className="w-3 h-3" />
                            <span>{item.highlight}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={(e) => toggleSaveItem(item.id, e)}
                          title={isSaved ? 'Remove from tasting list' : 'Add to personal tasting list'}
                          className={`p-2 rounded-full border transition-all ${
                            isSaved
                              ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                              : 'bg-white/5 border-white/10 text-stone-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                        <span className="font-serif text-2xl text-amber-300 font-light tabular-nums">
                          ${item.price}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-stone-400 text-sm leading-relaxed mb-5">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Metadata: Pairing & Dietary unboxed */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
                    <div className="flex items-center gap-1.5 text-stone-300 line-clamp-1">
                      <Wine className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{item.pairing}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-stone-400">
                      {item.dietary?.map((tag, idx) => (
                        <span key={tag}>
                          {tag}
                          {idx < (item.dietary?.length || 0) - 1 ? ' · ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Saved Tasting Notes Drawer Banner if items selected */}
        {savedItems.length > 0 && (
          <div className="mt-12 p-4 rounded-xl glass-card border border-amber-500/30 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                {savedItems.length}
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-amber-200 font-medium">Personal Degustation Selection</div>
                <div className="text-stone-400 text-xs">These dishes will be prioritized during your visit. Mention code AURELIA-SELECT.</div>
              </div>
            </div>
            <a
              href="#reservation"
              className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Reserve with Selected Dishes &rarr;
            </a>
          </div>
        )}

        {/* Modal Item Spotlight */}
        <AnimatePresence>
          {activeItemModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-lg w-full rounded-2xl glass-card border border-amber-500/30 p-8 shadow-2xl space-y-6"
              >
                <button
                  onClick={() => setActiveItemModal(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.2em] text-amber-400 font-medium">
                    Dish Spotlight · {activeItemModal.category.toUpperCase()}
                  </div>
                  <h3 className="font-serif text-3xl text-white font-medium">
                    {activeItemModal.name}
                  </h3>
                  <div className="text-2xl font-serif text-amber-300 tabular-nums">
                    ${activeItemModal.price}
                  </div>
                </div>

                <p className="text-stone-300 text-sm leading-relaxed">
                  {activeItemModal.description}
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Wine className="w-4 h-4 text-amber-400" />
                    <span className="text-stone-400">Recommended Cellar Pairing:</span>
                    <span className="text-stone-200 font-medium">{activeItemModal.pairing}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-400" />
                    <span className="text-stone-400">Dietary & Nutrition:</span>
                    <span className="text-stone-200">{activeItemModal.dietary?.join(', ')} ({activeItemModal.calories})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (!savedItems.includes(activeItemModal.id)) {
                        setSavedItems([...savedItems, activeItemModal.id]);
                      }
                      setActiveItemModal(null);
                    }}
                    className="flex-1 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-wider transition-all"
                  >
                    {savedItems.includes(activeItemModal.id) ? 'Dish In Tasting List' : 'Add to Tasting List'}
                  </button>
                  <button
                    onClick={() => setActiveItemModal(null)}
                    className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 text-xs uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
