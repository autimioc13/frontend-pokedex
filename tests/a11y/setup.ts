import '@testing-library/jest-dom/vitest'
import axe from 'axe-core'

// Deshabilitar color-contrast: jsdom no tiene motor CSS real.
// El contraste se verifica en Storybook (addon-a11y) con browser real.
export async function checkA11y(container: HTMLElement): Promise<void> {
  const results = await axe.run(container, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'best-practice'],
    },
    rules: {
      'color-contrast': { enabled: false },
    },
  })

  if (results.violations.length > 0) {
    const violationMessages = results.violations
      .map(
        (v) =>
          `\n[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n` +
          v.nodes.map((n) => `  → ${n.html}`).join('\n'),
      )
      .join('\n')

    throw new Error(
      `Se encontraron ${results.violations.length} violación(es) de accesibilidad:\n${violationMessages}`,
    )
  }
}
