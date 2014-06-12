#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright (C) 2013 Desarrolladores de Tribus
#
# This file is part of Tribus.
#
# Tribus is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Tribus is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

'''

tribus.common.fabric
====================


'''

import os
import pwd
from fabric.api import env
from tribus import BASEDIR
from tribus.config.base import CONFDIR, AUTHOR, AUTHOR_EMAIL
from tribus.config.ldap import (AUTH_LDAP_SERVER_URI,
                                AUTH_LDAP_BIND_DN, AUTH_LDAP_BIND_PASSWORD)
# from tribus.config.web import (WSGI_APPLICATION, STATICFILES_DIRS)
from tribus.config.pkg import (python_dependencies, debian_run_dependencies,
                               debian_build_dependencies)
from tribus.common.logger import get_logger
from tribus.common.utils import get_path
from tribus.common.system import get_local_arch
from tribus.common.fabric.maint import (pull_debian_base_image,
                                        pull_tribus_base_image,
                                        generate_debian_base_image,
                                        generate_tribus_base_image,
                                        docker_kill_all_containers)
from tribus.common.fabric.django import (django_runserver,
                                         django_syncdb)

logger = get_logger()


def development():
    '''
    '''

    # Fabric environment configuration
    env.basedir = BASEDIR
    env.hosts = ['localhost']
    env.environment = 'development'
    env.user = pwd.getpwuid(os.getuid()).pw_name
    env.root = 'root'

    # Docker config
    env.docker = 'docker.io'
    env.arch = get_local_arch()
    env.docker_maintainer = '%s <%s>' % (AUTHOR, AUTHOR_EMAIL)

    env.debian_base_image = 'luisalejandro/debian-%(arch)s:wheezy' % env
    env.tribus_base_image = 'luisalejandro/tribus-%(arch)s:wheezy' % env
    env.tribus_runtime_image = 'luisalejandro/tribus-run-%(arch)s:wheezy' % env
    env.tribus_runtime_container = 'tribus-run-container'

    env.tribus_static_dir = get_path([BASEDIR, 'tribus', 'data', 'static'])

    env.tribus_supervisor_config = get_path([CONFDIR, 'data',
                                             'tribus.supervisor.conf'])
    env.tribus_uwsgi_config = get_path([CONFDIR, 'data',
                                        'tribus.uwsgi.ini'])
    env.tribus_nginx_config = get_path([CONFDIR, 'data',
                                        'tribus.nginx.conf'])

    env.debian_base_image_script = get_path([BASEDIR, 'tribus',
                                             'data', 'scripts',
                                             'debian-base-image.sh'])
    env.tribus_base_image_script = get_path([BASEDIR, 'tribus',
                                             'data', 'scripts',
                                             'tribus-base-image.sh'])
    env.tribus_django_syncdb_script = get_path([BASEDIR, 'tribus',
                                                'data', 'scripts',
                                                'django-syncdb.py'])
    env.tribus_django_runserver_script = get_path([BASEDIR, 'tribus',
                                                   'data', 'scripts',
                                                   'django-runserver.sh'])

    env.preseed_db = get_path([CONFDIR, 'data', 'preseed-db.sql'])
    env.preseed_debconf = get_path([CONFDIR, 'data', 'preseed-debconf.conf'])
    env.preseed_ldap = get_path([CONFDIR, 'data', 'preseed-ldap.ldif'])

    env.python_dependencies = ' '.join(python_dependencies)
    env.debian_run_dependencies = ' '.join(debian_run_dependencies)
    env.debian_build_dependencies = ' '.join(debian_build_dependencies)

    env.ldap_passwd = AUTH_LDAP_BIND_PASSWORD
    env.ldap_writer = AUTH_LDAP_BIND_DN
    env.ldap_server = AUTH_LDAP_SERVER_URI
    env.ldap_args = ('-x '
                     '-w \\"%(ldap_passwd)s\\" '
                     '-D \\"%(ldap_writer)s\\" '
                     '-H \\"%(ldap_server)s\\"') % env

    preseed_env = ['DEBIAN_FRONTEND=noninteractive',
                   'DJANGO_SETTINGS_MODULE=tribus.config.web',
                   'PYTHONPATH=$PYTHONPATH:%(basedir)s' % env]
    mounts = ['%(basedir)s:%(basedir)s:rw' % env]
    start_services = ['mongodb', 'postgresql', 'redis-server', 'slapd',
                      'uwsgi', 'nginx', 'supervisor']

    env.preseed_env = ' '.join('--env %s' % i for i in preseed_env)
    env.mounts = ' '.join('--volume %s' % i for i in mounts)
    env.start_services = '\n'.join('service %s start' % i
                                   for i in start_services)
    env.start_services_python = '\n'.join('subprocess.call([\'service\','
                                          '\'%s\', \'start\'])' % i
                                          for i in start_services)


def generate_debian_base_image_i386():
    '''
    '''
    env.arch = 'i386'
    generate_debian_base_image(env)


def generate_debian_base_image_amd64():
    '''
    '''
    env.arch = 'amd64'
    generate_debian_base_image(env)


def generate_tribus_base_image_i386():
    '''
    '''
    env.arch = 'i386'
    env.debian_base_image = 'luisalejandro/debian-i386:wheezy'
    env.tribus_base_image = 'luisalejandro/tribus-i386:wheezy'
    pull_debian_base_image(env)
    generate_tribus_base_image(env)


def generate_tribus_base_image_amd64():
    '''
    '''
    env.arch = 'amd64'
    env.debian_base_image = 'luisalejandro/debian-amd64:wheezy'
    env.tribus_base_image = 'luisalejandro/tribus-amd64:wheezy'
    pull_debian_base_image(env)
    generate_tribus_base_image(env)


def environment():
    '''
    '''
    pull_debian_base_image(env)
    pull_tribus_base_image(env)


def reset_environment():
    '''
    '''
    pull_debian_base_image(env)
    pull_tribus_base_image(env)


def update_environment():
    '''
    '''

    pull_debian_base_image(env)
    generate_tribus_base_image(env)


def syncdb():
    '''
    '''
    django_syncdb(env)


def runserver():
    '''
    '''
    django_runserver(env)
