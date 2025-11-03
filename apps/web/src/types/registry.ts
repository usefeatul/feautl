import type { ComponentType } from 'react'
import MrrTool from '../components/tools/revenue/mrr'
import ArrTool from '../components/tools/revenue/arr'
import GrowthRateTool from '../components/tools/revenue/growth-rate'
import ArpuTool from '../components/tools/revenue/arpu'
import LtvTool from '../components/tools/revenue/ltv'
import ChurnTool from '../components/tools/customer/churn'
import NpsTool from '../components/tools/customer/nps'
import CacTool from '../components/tools/customer/cac'
import CltvCacRatioTool from '../components/tools/customer/cltv-cac-ratio'
import ActivationRateTool from '../components/tools/customer/activation-rate'
import RetentionRateTool from '../components/tools/customer/retention-rate'
import CustomerCohortsTool from '../components/tools/customer/customer-cohorts'
import FeatureAdoptionTool from '../components/tools/product/feature-adoption'
import CohortAnalysisTool from '../components/tools/product/cohort-analysis'

export const TOOL_COMPONENTS: Record<string, Record<string, ComponentType>> = {
  'product-feature-analytics': {
    'feature-adoption-calculator': FeatureAdoptionTool,
    'cohort-analysis': CohortAnalysisTool,
  },
  'revenue-growth': {
    'mrr-calculator': MrrTool,
    'arr-calculator': ArrTool,
    'growth-rate-calculator': GrowthRateTool,
    'arpu-calculator': ArpuTool,
    'ltv-calculator': LtvTool,
  },
  'customer-metrics': {
    'churn-calculator': ChurnTool,
    'nps-calculator': NpsTool,
    'cac-calculator': CacTool,
    'cltv-cac-ratio': CltvCacRatioTool,
    'activation-rate': ActivationRateTool,
    'retention-rate': RetentionRateTool,
    'customer-cohort-analysis': CustomerCohortsTool,
  },
}