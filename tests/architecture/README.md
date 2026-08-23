# Architecture tests

This directory contains executable architecture checks.

Required cases as the implementation grows:

1. Domain may import only domain-owned code and explicitly approved language/runtime primitives.
2. Application may depend on domain ports, never infrastructure implementations.
3. Infrastructure may implement ports without leaking its concrete types inward.
4. Interfaces may call application contracts, never persistence directly.
5. A bounded context cannot import another bounded context's persistence implementation.
6. Consultation cannot bypass projection to query source/import storage.
7. Generated output is excluded from architecture scanning.

The first executable scanner is `scripts/check-architecture.mjs`.
