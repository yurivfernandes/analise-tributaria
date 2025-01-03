import { useEffect } from 'react';

interface PageTitleProps {
  title: string;
  suffix?: string;
}

export const PageTitle = ({ title, suffix = '| Análise Tributária' }: PageTitleProps) => {
  useEffect(() => {
    document.title = `${title} ${suffix}`;
    return () => {
      document.title = 'Análise Tributária | Sistema de Análise Fiscal';
    };
  }, [title, suffix]);

  return null;
};
