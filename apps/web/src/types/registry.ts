import type { ComponentType } from 'react'
import MrrTool from '../components/tools/revenue/mrr'
import ChurnTool from '../components/tools/retention/churn'
import NpsTool from '../components/tools/feedback/nps'
import FeedbackTemplatesTool from '../components/tools/feedback/templates'

export const TOOL_COMPONENTS: Record<string, Record<string, ComponentType>> = {
  'revenue-growth': {
    'mrr-calculator': MrrTool,
  },
  'customer-metrics': {
    'churn-calculator': ChurnTool,
    'nps-calculator': NpsTool,
    'feedback-templates': FeedbackTemplatesTool,
  },
}