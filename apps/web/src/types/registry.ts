import type { ComponentType } from 'react'
import MrrTool from '../components/tools/revenue/mrr'
import ChurnTool from '../components/tools/retention/churn'
import NpsTool from '../components/tools/feedback/nps'
import FeedbackTemplatesTool from '../components/tools/feedback/templates'

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