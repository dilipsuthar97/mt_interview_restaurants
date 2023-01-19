import {useAnimatedScrollHandler} from 'react-native-reanimated';
import {Tools} from '_utils';
import {SEARCH_BAR_HEIGHT} from '_components/molecules/SearchBar';

const useScrollHandlerScrollBar = scrollY => {
  const scrollHandler =
    useAnimatedScrollHandler <
    ScrollHandlerContext >
    {
      onBeginDrag(event, context) {
        context.y = event.contentOffset.y;
      },
      onScroll(event, context) {
        let {y} = event.contentOffset;
        if (y < 0) {
          y = 0;
        }
        const dy = y - (context?.y ?? 0);
        scrollY.value = Tools.clamp(scrollY.value + dy, 0, SEARCH_BAR_HEIGHT);
        context.y = y;
      },
    };

  return scrollHandler;
};

export default useScrollHandlerScrollBar;
