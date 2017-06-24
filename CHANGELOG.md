# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [2.0.0] - 2017-06-24

### Added

- [#2](https://github.com/FantasticFiasco/axis-discovery-ssdp/issues/2) - Calling `Discovery.stop()` stops listening for SSDP advertisements

### Changed

- Replaced `null` with `undefined` according to [TypeScript guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined)

## [1.0.2] - 2017-01-26

### Fixed

- [#40](https://github.com/FantasticFiasco/axis-discovery-ssdp/issues/40) - Calling `Discovery.search()` didn't trigger a new search

## [1.0.1] - 2016-12-06

### Fixed

- Updated `README.md` in package

## [1.0.0] - 2016-12-04

### Added

- Support for discovering [Axis Communications](http://www.axis.com/) devices on the network using SSDP
