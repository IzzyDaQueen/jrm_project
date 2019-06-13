const TILE_MAPPING = {
    WALL: {
      TOP_LEFT: 23,
      TOP_RIGHT: 23,
      BOTTOM_RIGHT: 23,
      BOTTOM_LEFT: 23,
      // Let's add some randomization to the walls while we are refactoring:
      TOP: 15,
      LEFT: 15,
      RIGHT: 15,
      BOTTOM: 15,
    },
    FLOOR: 16,
    POT: [{ index: 10, weight: 1 }, { index: 11, weight: 1 }, { index: 12, weight: 1 }],
    DOOR: 0,
    CHEST: [{ index: 13, weight: 1 }, { index: 14, weight: 1 }, { index: 19, weight: 1 }],
    STAIRS: 18,
    BLANK:24,
  };
  
  export default TILE_MAPPING;