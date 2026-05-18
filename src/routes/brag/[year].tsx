import { useParams } from '@solidjs/router'

import { BragReportPage, getBragReportContent } from '~/components/brag/report-page'

export const route = {
  preload({ params }: { params: { year: string } }) {
    void getBragReportContent(params.year)
  },
}

export default function BragReportRoute() {
  const params = useParams<{ year: string }>()

  return <BragReportPage year={params.year} />
}
