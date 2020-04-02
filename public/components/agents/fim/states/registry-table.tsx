
/*
 * Wazuh app - Integrity monitoring components
 * Copyright (C) 2015-2020 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, { Component } from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n/react';
import { WzRequest } from '../../../react-services/wz-request';

export class RegistryTable extends Component {
  state: {
    filters: {},
  }

	constructor(props) {
		super(props);

		this.state = {
			filters: {},
		}
  }
  
  render() {
    return (
      <div>Windows Registry</div>
    )
  }
}
