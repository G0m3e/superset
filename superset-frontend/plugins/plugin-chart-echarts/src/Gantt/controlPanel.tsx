/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {
  ControlPanelConfig,
  ControlSubSectionHeader,
  sections,
  formatSelectOptions,
  sharedControls,
} from '@superset-ui/chart-controls';
import { GenericDataType, t } from '@superset-ui/core';
import {
  legendSection,
  showExtraControls,
  tooltipTimeFormatControl,
  tooltipValuesFormatControl,
} from '../controls';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'start_time',
            config: {
              ...sharedControls.entity,
              label: t('Start Time'),
              description: undefined,
              allowedDataTypes: [GenericDataType.Temporal],
            },
          },
        ],
        [
          {
            name: 'end_time',
            config: {
              ...sharedControls.entity,
              label: t('End Time'),
              description: undefined,
              allowedDataTypes: [GenericDataType.Temporal],
            },
          },
        ],
        [
          {
            name: 'y_axis',
            config: {
              ...sharedControls.x_axis,
              label: t('Y-axis'),
              description: t('Dimension to use on y-axis.'),
              initialValue: () => undefined,
            },
          },
        ],
        ['series'],
        [
          {
            name: 'subcategories',
            config: {
              type: 'CheckboxControl',
              label: t('Subcategories'),
              description: t(
                'Divides each category into subcategories based on the values in ' +
                  'the dimension. It can be used to exclude intersections.',
              ),
              renderTrigger: true,
              default: false,
              visibility: ({ controls }) => !!controls?.series?.value,
            },
          },
        ],
        ['tooltip_metrics'],
        ['tooltip_columns'],
        ['adhoc_filters'],
        ['order_by_cols'],
        ['row_limit'],
      ],
    },
    {
      ...sections.annotationsAndLayersControls,
    },
    {
      ...sections.titleControls,
      controlSetRows: [...sections.titleControls.controlSetRows.slice(0, -1)],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      tabOverride: 'customize',
      controlSetRows: [
        ['color_scheme'],
        ...legendSection,
        ['zoomable'],
        [showExtraControls],
        [<ControlSubSectionHeader>{t('X Axis')}</ControlSubSectionHeader>],
        [
          {
            name: 'x_axis_date_zoom_offset',
            config: {
              type: 'BoundsControl',
              label: t('X-Axis Date Offsets'),
              description: t(
                'Set start and end offsets relative to today for the initial X-axis zoom window (for example, -1 means one unit before today).',
              ),
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'x_axis_date_unit',
            config: {
              type: 'SelectControl',
              clearable: true,
              label: t('Date Offset Unit'),
              description: t(
                'Time unit used to interpret the X-axis date offsets.',
              ),
              renderTrigger: true,
              default: 'month',
              choices: formatSelectOptions(['day', 'week', 'month', 'year']),
            },
          },
        ],
        ['x_axis_time_format'],
        [<ControlSubSectionHeader>{t('Tooltip')}</ControlSubSectionHeader>],
        [tooltipTimeFormatControl],
        [tooltipValuesFormatControl],
      ],
    },
  ],
};

export default config;
