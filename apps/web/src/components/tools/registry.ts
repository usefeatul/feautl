import type { ComponentType } from 'react'
import MrrTool from './revenue/mrr'
import ChurnTool from './retention/churn'
import NpsTool from './feedback/nps'
import FeedbackTemplatesTool from './feedback/templates'

export const TOOL_COMPONENTS: Record<string, Record<string, ComponentType>> = {
  revenue: {
    'mrr-calculator': MrrTool,
  },
  retention: {
    'churn-calculator': ChurnTool,
  },
  feedback: {
    'nps-calculator': NpsTool,
    'feedback-templates': FeedbackTemplatesTool,
  },
}