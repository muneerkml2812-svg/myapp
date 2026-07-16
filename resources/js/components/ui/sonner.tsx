import { useEffect, useState, type ComponentType, type CSSProperties } from 'react';
import { useFlashToast } from '@/hooks/use-flash-toast';
import { useAppearance } from '@/hooks/use-appearance';
import type { ToasterProps } from 'sonner';

type SonnerModule = {
    Toaster: ComponentType<ToasterProps>;
};

function Toaster({ ...props }: ToasterProps) {
    const { appearance } = useAppearance();
    const [ToasterComponent, setToasterComponent] = useState<ComponentType<ToasterProps> | null>(null);

    useFlashToast();

    useEffect(() => {
        let active = true;

        import('sonner')
            .then((mod: SonnerModule) => {
                if (active) {
                    setToasterComponent(() => mod.Toaster);
                }
            })
            .catch(() => {
                /* ignore client-only module import errors during hydration */
            });

        return () => {
            active = false;
        };
    }, []);

    if (!ToasterComponent) {
        return null;
    }

    return (
        <ToasterComponent
            theme={appearance}
            className="toaster group"
            position="bottom-right"
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                } as CSSProperties
            }
            {...props}
        />
    );
}

export { Toaster };
