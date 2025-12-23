**Assumptions**
I can define the schema for each source based on the provided mocks.
The data is fetched only once on mount.

**Decisions & Trade-offs**
The internal entry schema defines calories in Kcal and weights in g. 
While it's easier to work with, it also takes away some flexibility.

Hide entries if schema parsing fails. We might want to show them with a warning instead.

**What I Didn’t Build (and why)**
Logic checks: in the provided mocks there are clearly some logic errors i.e. source B id: b2 it states 500 calories for Water. We need a system to check those kind of values (we already do some maths on the values so in this specific instance this entry is flagged appropriately)

There are some calculations to be made for source D as macro basis serving size !== stated calories servig size. 

**What I’d Do Next**
- Enforce stronger schemas and validations.
- Implement a system to check logic errors.
- Refine UI