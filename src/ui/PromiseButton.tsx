import { MouseEvent, useState } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Fade from "react-bootstrap/Fade";

interface PromiseButtonProps extends Omit<ButtonProps, 'href'> {
  promiseFnc?: () => Promise<any>;
}

const MIN_ANIMATION_TIME = 300;

export function PromiseButton({children, disabled, promiseFnc, onClick, className, ...props}: PromiseButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const overrideOnClick = (e: MouseEvent<HTMLElement>) => {
    onClick?.(e);

    if (!promiseFnc) {
      return;
    }

    setIsLoading(true);

    const startTime = new Date().getTime();

    promiseFnc().finally(() => {
      const deltaTime = new Date().getTime() - startTime;

      if (deltaTime > MIN_ANIMATION_TIME) { 
        setIsLoading(false);
        return;
      }

      setTimeout(() => {
        setIsLoading(false);
      }, MIN_ANIMATION_TIME - deltaTime);
    });
  }

  return (
    <Button disabled={isLoading || disabled} {...props} onClick={overrideOnClick} className={`${className} btn-promise`}>
      <Fade in={isLoading}>
        <div className="btn-promise-spinner-container">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </div>
      </Fade>
      <Fade in={!isLoading}>
        <div>{children}</div>
      </Fade>
    </Button>
  )
}