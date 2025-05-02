import {
    css,
    Interpolation,
    Theme,
  } from "@emotion/react";
  import * as emotionStyled from "@emotion/styled";
  import {
    ComponentPropsWithRef,
    ElementType,
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes,
    forwardRef,
  } from "react";
  
  // The sx prop type
  type SxProp = Interpolation<Theme> | Interpolation<Theme>[];
  
  // We add `sx` to the props of the styled component
  type SxProps = { sx?: SxProp };
  
  // Utility type to add `sx` prop to the wrapped styled component
  type StyledWithSx<T extends ElementType, P = {}> = ForwardRefExoticComponent<
    PropsWithoutRef<ComponentPropsWithRef<T> & P & SxProps> &
      RefAttributes<any>
  >;
  
  // The core wrap function
  function wrapWithSx<T extends ElementType, P = {}>(
    StyledComponent: ForwardRefExoticComponent<
      PropsWithoutRef<ComponentPropsWithRef<T> & P> & RefAttributes<any>
    >
  ): StyledWithSx<T, P> {
    const Component = forwardRef<any, ComponentPropsWithRef<T> & P & SxProps>(
      ({ sx, ...props }, ref) => {
        // We need to remove both `sx` and `css` from the props we forward,
        // since we are injecting our own merged `css`.
        const { css: cssProp, ...rest } = props as any;
  
        return (
          <StyledComponent
            {...rest} // ✅ No `sx` or `css` passed down
            ref={ref}
            css={(theme: Theme) => {
              const baseCss =
                typeof cssProp === "function" ? cssProp(theme) : cssProp;
  
              const sxCss = Array.isArray(sx)
                ? sx.map((item) =>
                    typeof item === "function" ? item(theme) : item
                  )
                : typeof sx === "function"
                ? sx(theme)
                : sx;
  
              return [baseCss, sxCss];
            }}
          />
        );
      }
    );
  
    return Component as StyledWithSx<T, P>;
  }
  
  // Build the proxy to handle both `styled('div')` and `styled.div`
  const styled = new Proxy(emotionStyled.default, {
    apply(
      target,
      thisArg,
      argArray: Parameters<typeof emotionStyled.default>
    ) {
      const result = (target as any).apply(thisArg, argArray);
      return wrapWithSx(result);
    },
    get(target, prop, receiver) {
      const styledTag = Reflect.get(target, prop, receiver);
      if (typeof styledTag === "function") {
        return wrapWithSx(styledTag);
      }
      return styledTag;
    },
  });
  
  export { styled };
  