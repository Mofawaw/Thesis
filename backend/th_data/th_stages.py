from typing import List
from .th_types import ThStage

stages: List[ThStage] = [
    ThStage(
        id="s1",
        label="Wertetypen",
        color="th-value",
        logo="castle-value",
        levels_id=["l-s1c1", "l-s1c2", "l-s1c3"]
    ),
    ThStage(
        id="s2",
        label="Referenztypen",
        color="th-reference",
        logo="castle-reference",
        levels_id=["l-s2c1", "l-s2c2", "l-s2c3"]
    ),
    ThStage(
        id="s3",
        label="Werte- & Referenztypen",
        color="th-together",
        logo="castle-together",
        levels_id=["l-s3c1", "l-s3c2", "l-s3c3"]
    )
]